import { NextRequest, NextResponse } from "next/server";
import { getCheckoutSession, getUserById } from "@/actions/stripe";
import pricingConfig from "@/lib/config/pricingConfig";
import { getSessionUser } from "@/services/user";
import { createPayment, getCredit } from "@smartleadmagnet/services";

export async function GET(req: NextRequest) {
  // get query params from the URL
  const session_id = req.nextUrl.searchParams.get("session_id");
  const sessionUser = await getSessionUser();
  // get the session from the stripe
  const session = await getCheckoutSession(session_id as string);

  // @ts-ignore
  try {
    const userId = sessionUser?.id ?? "";
    if (session.payment_status === "paid") {
      const priceId = session.line_items.data[0].price.id;
      if (!session) return NextResponse.json({ error: "Invalid session" }, { status: 400 });

      const user = await getUserById(session.customer);

      if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

      // Get plan details from price ID
      const plan = pricingConfig.plans.find((plan) => plan.priceId === priceId);
      if (!plan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

      // Update sessionUser's credits
      const existingCredit = await getCredit(user.id);
      const updatedCredits = existingCredit ? existingCredit.total + plan.credits : plan.credits;

      await updatedCredits(user.id, updatedCredits);

      await createPayment({
        stripeSessionId: session.id,
        stripeCustomerId: user.stripeCustomerId,
        userId,
        planType: plan.duration || (plan.isSubscription ? "subscription" : "one-time"),
        credits: plan.credits,
        price: plan.discountPrice,
      });
    }
  } catch (error) {
    console.error("Error handling payment:", error);
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
  }
}
