import { NextRequest, NextResponse } from "next/server";
import { getCheckoutSession } from "@/actions/stripe";
import pricingConfig from "@/lib/config/pricingConfig";
import { getSessionUser } from "@/services/user";
import { createPayment, getCredit, getUserById, upsetCredits, getPaymentBySessionId } from "@smartleadmagnet/services";

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get("session_id");
  const sessionUser = await getSessionUser();

  try {
    const session = await getCheckoutSession(session_id as string);
    if (!session) return NextResponse.json({ error: "Invalid session" }, { status: 400 });

    if (session.payment_status === "paid") {
      const userId = sessionUser?.id ?? "";

      const priceId = session.line_items.data[0].price.id;
      const user = await getUserById(userId);
      if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

      // Check if payment has already been processed
      const existingPayment = await getPaymentBySessionId(session.id);
      if (existingPayment) {
        return NextResponse.redirect(`${process.env.HOST_URL}/payment/success`); // Payment already processed
      }

      // Get plan details from price ID
      const plan = pricingConfig.plans.find((plan) => plan.priceId === priceId);
      if (!plan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

      // Update user's credits
      const existingCredit = await getCredit(user.id);
      const totalCredit = existingCredit ? existingCredit.total + plan.credits : plan.credits;

      await upsetCredits({
        userId,
        totalCredit,
      });

      // Create payment record
      await createPayment({
        stripeSessionId: session.id,
        stripeCustomerId: user.stripeCustomerId,
        userId,
        planType: plan.planTier,
        credits: plan.credits,
        price: plan.discountPrice,
      });

      return NextResponse.redirect(`${process.env.HOST_URL}/payment/success`); // Redirect to success page
    }

    return NextResponse.redirect(`${process.env.HOST_URL}/payment/error`); // Redirect to success page
  } catch (error) {
    console.error("Error handling payment:", error);
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
  }
}
