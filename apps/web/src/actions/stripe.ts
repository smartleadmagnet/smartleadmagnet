"use server";

import Stripe from "stripe";
import pricingConfig from "@/lib/config/pricingConfig";
import getStripe from "@/lib/stripe";
import { getSessionUser } from "@/services/user";
import { getUserById, updateStripeCustomerId, updateSubscriptionDetailsForCancel } from "@smartleadmagnet/services";
import { getUserInfo } from "@/actions/user";
import { revalidatePath } from "next/cache";

export async function createPaymentLink(customerId: string, priceId: string, referral?: string | null) {
  const stripe = getStripe();
  const plan = pricingConfig.plans.find((plan) => plan.priceId === priceId);
  const mode = plan?.isSubscription ? "subscription" : "payment";
  const checkoutSessionParams: Stripe.Checkout.SessionCreateParams = {
    mode,
    allow_promotion_codes: true,
    line_items: [
      {
        price: priceId, // The price_id of the product
        quantity: 1, // The quantity of the product
      },
    ],
    metadata: {},
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    customer: customerId,
  };

  if (referral) {
    checkoutSessionParams.metadata = {
      ...checkoutSessionParams.metadata,
      promotekit_referral: referral,
    };
  }

  const session = await stripe.checkout.sessions.create(checkoutSessionParams);
  return session.url;
}

export async function createStripeCustomer({ name, email }: { email: string; name: string }) {
  const stripe = getStripe();
  const customer = await stripe.customers.create({
    name,
    email,
  });

  return customer.id;
}

export async function getCheckoutSession(sessionId: string) {
  const stripe = getStripe();
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });
}

export async function getSubscription(subscriptionId: string) {
  const stripe = getStripe();
  return stripe.subscriptions.retrieve(subscriptionId);
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const stripe = getStripe();
    // Cancel the subscription on Stripe
    const canceledSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true, // Set to cancel at the end of the current period
    });

    // Get the current user
    const user = await getUserInfo();
    if (!user) {
      return { success: false, error: "User not authenticated." };
    }

    const { current_period_end, current_period_start } = canceledSubscription;
    const planDetails = pricingConfig?.plans.find((plan) => {
      // Match the plan ID (assuming it's within the items data)
      return plan.priceId === canceledSubscription?.items?.data?.[0]?.price?.id;
    });

    if (!planDetails) {
      return { success: false, error: "Plan details not found." };
    }

    await updateSubscriptionDetailsForCancel({
      stripeCustomerId: user?.stripeCustomerId!,
      subscriptionId: subscriptionId,
      currentPeriodStart: current_period_start,
      currentPeriodEnd: current_period_end,
    });
    // Update the subscription details in the Payment schema

    revalidatePath("/settings/billing");
    return { success: true, error: null };
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return { success: false, error: "Failed to cancel subscription, please try later or reach out to Support Team." };
  }
}

//
// export async function updateSubscription(subscription: Subscription, priceId: string) {
//   try {
//     // Update the subscription
//     const stripeSubscription = await getSubscription(subscription.stripeSubscriptionId!);
//     return await stripe.subscriptions.update(subscription.stripeSubscriptionId!, {
//       items: [{ price: priceId, id: stripeSubscription?.items?.data[0].id }],
//     });
//   } catch (error) {
//     // TODO Sentry Error
//     console.error("Error updating subscription:", error);
//   }
// }
//
// export async function deleteSubscription(subscriptionId: string) {
//   try {
//     // Delete the subscription
//     const previousSubscription = await getSubscription(subscriptionId);
//     if (previousSubscription.status !== "canceled") {
//       await stripe.subscriptions.cancel(subscriptionId, {
//         invoice_now: true,
//         prorate: true,
//       });
//     }
//   } catch (error) {
//     // TODO Sentry Error
//     console.error("Error deleting subscription:", error);
//   }
// }
//
export const getSingInLink = async (priceId: string, referer?: string | null) => {
  if (!priceId) {
    return "/";
  }
  const user = await getSessionUser();
  const userId = user?.id ?? "";
  if (userId) {
    const user = await getUserById(userId);
    if (user) {
      // console.log("user?.stripeCustomerId", user?.stripeCustomerId);
      let customerId = user?.stripeCustomerId;

      if (!customerId) {
        const customer = await createStripeCustomer({ email: user?.email!, name: user?.name! });
        await updateStripeCustomerId({ id: user?.id!, stripeCustomerId: customer });
        customerId = customer;
      }
      if (customerId && userId) {
        return await createPaymentLink(customerId, priceId, referer);
      }
    }
  }
  return `${process.env.HOST_URL}/api/auth/signin?callbackUrl=${encodeURIComponent(`${process.env.HOST_URL}/api/payment/checkout?priceId=${priceId}&referer=${referer}`)}`;
};
