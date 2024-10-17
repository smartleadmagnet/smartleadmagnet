import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { buffer } from "micro";
import {
  getUserById,
  getPaymentBySessionId,
  createPayment,
  getCredit,
  upsetCredits,
  getUserByStripeCustomerId,
} from "@smartleadmagnet/services";
import pricingConfig from "@/lib/config/pricingConfig";
import Stripe from "stripe";
import { getCheckoutSession } from "@/actions/stripe";

const stripeWebhookSecret = process.env.STRIPE_ENDPOINT_SECRET;

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");
  let event;

  try {
    // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
    event = stripe.webhooks.constructEvent(
      payload, // Stringify the request for the Stripe library
      signature!,
      stripeWebhookSecret
    );
  } catch (err: any) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return NextResponse.json({ message: "Webhook signature verification failed." }, { status: 400 });
  }

  // Handle the event types
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
      break;

    case "invoice.payment_succeeded": // Handle subscription renewals here
      await handleSubscriptionRenewal(event.data.object as Stripe.Invoice);
      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
      break;
  }

  return NextResponse.json({ received: true });
}

// Function to handle checkout session completion
async function handleCheckoutSessionCompleted(checkoutSession: Stripe.Checkout.Session) {
  try {
    const session = await getCheckoutSession(checkoutSession.id as string);

    const priceId = session.line_items?.data[0]?.price?.id;
    const stripeCustomerId = session.customer; // Assuming you pass userId in metadata

    if (!priceId || !stripeCustomerId) {
      console.error("Missing priceId or userId");
      return;
    }

    const user = await getUserByStripeCustomerId(stripeCustomerId as string);
    if (!user) {
      console.error("User not found");
      return;
    }

    // Check if payment already processed
    const existingPayment = await getPaymentBySessionId(session.id);
    if (existingPayment) {
      console.log("Payment already processed");
      return;
    }

    // Get plan details from price ID
    const plan = pricingConfig.plans.find((plan) => plan.priceId === priceId);
    if (!plan) {
      console.error("Invalid plan");
      return;
    }

    // Update user's credits
    const existingCredit = await getCredit(user.id);
    const totalCredit = existingCredit ? existingCredit.total + plan.credits : plan.credits;

    const userId = user.id;
    await upsetCredits({
      userId,
      totalCredit,
    });

    // Create payment record
    await createPayment({
      stripeSessionId: session.id,
      stripeCustomerId: session.customer as string,
      userId,
      planType: plan.planTier,
      credits: plan.credits,
      price: plan.discountPrice,
    });

    console.log("Payment processed successfully");
  } catch (error) {
    console.error("Error processing checkout session:", error);
  }
}

// Function to handle subscription renewals
async function handleSubscriptionRenewal(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string;

    // Fetch user based on the customer ID (you may need to store this when the subscription is created)
    const user = await getUserByStripeCustomerId(customerId);
    if (!user) {
      console.error("User not found for subscription renewal");
      return;
    }

    // Get the price ID from the invoice line items (only handle the main subscription item)
    const priceId = invoice.lines.data[0].price.id;

    // Get plan details from price ID
    const plan = pricingConfig.plans.find((plan) => plan.priceId === priceId);
    if (!plan || !plan.isSubscription) {
      console.error("Invalid plan or not a subscription");
      return;
    }

    // Check if the payment for this invoice has already been processed
    const existingPayment = await getPaymentBySessionId(invoice.id);
    if (existingPayment) {
      console.log("Subscription renewal payment already processed");
      return;
    }

    // Update user's credits for subscription renewal
    // const existingCredit = await getCredit(user.id);
    const totalCredit = plan.credits; // For subscription renewal, we just set the total credits to the plan credits

    await upsetCredits({
      userId: user.id,
      totalCredit,
    });

    // Create payment record for renewal
    await createPayment({
      stripeSessionId: invoice.id,
      stripeCustomerId: customerId,
      userId: user.id,
      planType: "subscription-renewal", // Mark as a subscription renewal
      credits: plan.credits,
      price: invoice.total / 100, // Convert to the actual amount in USD
    });

    console.log("Subscription renewal processed successfully");
  } catch (error) {
    console.error("Error processing subscription renewal:", error);
  }
}

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body for webhooks
  },
};
