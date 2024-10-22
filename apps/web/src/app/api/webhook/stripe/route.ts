import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import {
  createPayment,
  getCredit,
  getPaymentBySessionId,
  getUserByStripeCustomerId,
  upsetCredits,
} from "@smartleadmagnet/services";
import pricingConfig from "@/lib/config/pricingConfig";
import Stripe from "stripe";
import { getCheckoutSession, getSubscription } from "@/actions/stripe";
import { PlanTier } from "@/lib/types";
import prisma from "@smartleadmagnet/database";

const stripeWebhookSecret = process.env.STRIPE_ENDPOINT_SECRET!;

export const dynamic = "force-dynamic";

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

    case "customer.subscription.deleted":
      await handleSubscriptionCancellation(event.data.object as Stripe.Subscription);
      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
      break;
  }

  return NextResponse.json({ received: true });
}

// Function to handle checkout session completion
// Function to handle checkout session completion
async function handleCheckoutSessionCompleted(checkoutSession: Stripe.Checkout.Session) {
  try {
    const session = await getCheckoutSession(checkoutSession.id as string);

    const priceId = session.line_items?.data[0]?.price?.id;
    const stripeCustomerId = session.customer;
    const subscriptionId = session.subscription as string;

    if (!priceId || !stripeCustomerId) {
      console.error("Missing priceId or stripeCustomerId");
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
    const existingCredit = await getCredit(user?.id!);
    const totalCredit = existingCredit ? existingCredit.total + plan.credits : plan.credits;

    const userId = user?.id!;
    await upsetCredits({
      userId,
      totalCredit,
    });

    // Determine subscription status and dates
    let subscriptionStartDate = null;
    let subscriptionEndDate = null;
    let subscriptionStatus = null;

    if (subscriptionId) {
      const subscription = await getSubscription(subscriptionId);
      subscriptionStartDate = new Date(subscription.current_period_start * 1000);
      subscriptionEndDate = new Date(subscription.current_period_end * 1000);
      subscriptionStatus = subscription.status;
    }

    // Create payment record
    await createPayment({
      stripeSessionId: session.id,
      stripeCustomerId: session.customer as string,
      userId,
      planType: plan.planTier,
      credits: plan.credits,
      price: plan.discountPrice,
      subscriptionId,
      subscriptionStartDate: subscriptionStartDate!,
      subscriptionEndDate: subscriptionEndDate!,
      subscriptionStatus: subscriptionStatus!,
    });

    console.log("Payment processed successfully");
  } catch (error) {
    console.error("Error processing checkout session:", error);
  }
}

// Function to handle subscription renewals
// Function to handle subscription renewals
async function handleSubscriptionRenewal(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string;

    // Fetch user based on the customer ID
    const user = await getUserByStripeCustomerId(customerId);
    if (!user) {
      console.error("User not found for subscription renewal");
      return;
    }

    const priceId = invoice?.lines?.data?.[0]?.price?.id!;
    const subscriptionId = invoice.subscription as string;

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

    // Get subscription details for start, end dates, and status
    const subscription = await getSubscription(subscriptionId);
    const subscriptionStartDate = new Date(subscription.current_period_start * 1000);
    const subscriptionEndDate = new Date(subscription.current_period_end * 1000);
    const subscriptionStatus = subscription.status;

    const totalCredit = plan.credits;

    await upsetCredits({
      userId: user?.id!,
      totalCredit,
    });

    // Create payment record for renewal
    await createPayment({
      stripeSessionId: invoice.id,
      stripeCustomerId: customerId,
      userId: user?.id!,
      planType: PlanTier.SUBSCRIPTION,
      credits: plan.credits,
      price: invoice.total / 100,
      subscriptionId,
      subscriptionStartDate,
      subscriptionEndDate,
      subscriptionStatus,
    });

    console.log("Subscription renewal processed successfully");
  } catch (error) {
    console.error("Error processing subscription renewal:", error);
  }
}

// Function to handle subscription cancellations
async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;

    // Fetch user based on the customer ID
    const user = await getUserByStripeCustomerId(customerId);
    if (!user) {
      console.error("User not found for subscription cancellation");
      return;
    }

    // Check if a payment record exists for this subscription
    const existingPayment = await prisma.payment.findFirst({
      where: {
        subscriptionId: subscription.id,
        stripeCustomerId: customerId,
      },
    });

    if (!existingPayment) {
      console.log("No payment record found for this subscription cancellation");
      return;
    }

    // Update the subscription status and details
    await prisma.payment.update({
      where: { id: existingPayment.id },
      data: {
        subscriptionStatus: "canceled", // Update status to canceled
        subscriptionEndDate: new Date(subscription.current_period_end * 1000), // Update the end date
      },
    });

    console.log("Subscription cancellation processed successfully");
  } catch (error) {
    console.error("Error processing subscription cancellation:", error);
  }
}
