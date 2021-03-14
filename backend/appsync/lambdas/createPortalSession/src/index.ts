import { Callback, Context, Handler } from "aws-lambda";
require("isomorphic-fetch");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_API_KEY);

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
) => {
  if (event.arguments && event.arguments.customerId) {
    const customerId: string = event.arguments.customerId;
    try {
      const portalsession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: event.arguments.returnUrl ?? "https://potluck.cc",
      });

      return portalsession.url;
    } catch (err) {
      throw new Error(err);
    }
  } else {
    throw new Error("customer missing from event body");
  }
};
