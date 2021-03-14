import { Callback, Context, Handler } from "aws-lambda";
require("isomorphic-fetch");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_API_KEY);

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
) => {
  if (event.arguments && event.arguments.priceId) {
    const priceId: string = event.arguments.priceId;
    const redirect_url: string =
      event.arguments.redirect_url ?? "https://potluck.cc";
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${redirect_url}/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: redirect_url,
      });

      return session.id;
    } catch (err) {
      throw new Error(err);
    }
  } else {
    throw new Error("customer missing from event body");
  }
};
