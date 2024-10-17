"use server";

import Stripe from "stripe";
import pricingConfig from "@/lib/config/pricingConfig";
import stripe from "@/lib/stripe";
import { getSessionUser } from "@/services/user";
import { getUserById, updateStripeCustomerId } from "@smartleadmagnet/services";

export async function createPaymentLink(customerId: string, priceId: string) {
  const plan = pricingConfig.plans.find((plan) => plan.priceId === priceId);
  const mode = plan?.isSubscription ? "subscription" : "payment";
  const checkoutSessionParams: Stripe.Checkout.SessionCreateParams = {
    mode,
    line_items: [
      {
        price: priceId, // The price_id of the product
        quantity: 1, // The quantity of the product
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    customer: customerId,
  };

  const session = await stripe.checkout.sessions.create(checkoutSessionParams);
  return session.url;
}

export async function createStripeCustomer({ name, email }: { email: string; name: string }) {
  const customer = await stripe.customers.create({
    name,
    email,
  });

  return customer.id;
}

export async function getCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });
}

export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId);
}

// export async function getUserPurchaseInfo() {
//   const user = await getSessionUser();
//   if (!user?.id) {
//     return null;
//   }
//   return ensureUserSubscription(user?.id);
// }
//
// export async function cancelSubscription(subscriptionId: string) {
//   try {
//     // Cancel the subscription
//     const canceledSubscription = await stripe.subscriptions.update(subscriptionId, {
//       cancel_at_period_end: true,
//     });
//     const user = await getSessionUser();
//     const { id, current_period_end, current_period_start, status } = canceledSubscription;
//     const planDetails = pricingConfig?.plans.find((plan) => {
//       // @ts-ignore
//       return plan.priceId === canceledSubscription.plan.id;
//     });
//     await addOrUpdateSubscription({
//       userId: user.id,
//       stripeSubscriptionId: subscriptionId,
//       // @ts-ignore
//       duration: planDetails?.duration!,
//       startDate: new Date(current_period_start * 1000),
//       endDate: new Date(current_period_end * 1000),
//       tier: planDetails?.tier,
//       planId: planDetails?.priceId!,
//       status: "canceled",
//     });
//
//     return { success: true, error: null };
//   } catch (error) {
//     // TODO Sentry Error
//     console.error("Error canceling subscription:", error);
//     return { success: true, error: "Failed to cancel subscription, please try later or reach out to Support Team!!!" };
//   }
// }
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
export const getSingInLink = async (priceId: string) => {
  console.log("priceId", priceId);
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
        const customer = await createStripeCustomer({ email: user?.email!, name: user.name! });
        await updateStripeCustomerId({ id: user.id, stripeCustomerId: customer });
        customerId = customer;
      }
      if (customerId && userId) {
        return await createPaymentLink(customerId, priceId);
      }
    }
  }
  return `/api/auth/signin?callbackUrl=${encodeURIComponent(`/api/payment/checkout?priceId=${priceId}`)}`;
};
