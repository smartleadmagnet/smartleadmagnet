import { NextRequest } from "next/server";
import { createPaymentLink, createStripeCustomer } from "@/actions/stripe";
import { Env } from "@/lib/Env.mjs";
import { getSessionUser, getUserById, updateStripeCustomerId } from "@/service/user";

export async function GET(req: NextRequest) {
  // get query params from the URL
  const priceId = req.nextUrl.searchParams.get("priceId");
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id ?? "";

  if (userId) {
    const user = await getUserById(userId);
    if (user) {
      if (user.stripePaymentDate) {
        // redirect to the landing page
        return Response.redirect(`${Env.HOST_URL}/payment/success`);
      }
      let stripeCustomerId = user?.stripeCustomerId;
      if (!stripeCustomerId) {
        const email = sessionUser.email;
        const customer = await createStripeCustomer({ email, name: user.name! });

        await updateStripeCustomerId({ id: user.id, stripeCustomerId: customer });
        stripeCustomerId = customer;
      }
      const paymentLink = await createPaymentLink(stripeCustomerId, priceId as string);
      return Response.redirect(paymentLink!);
    }
  }
  return Response.redirect(`${Env.HOST_URL}`);
}
