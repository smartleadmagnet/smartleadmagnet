import Stripe from "stripe";

const getStripe = () => {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
};

export default getStripe;
