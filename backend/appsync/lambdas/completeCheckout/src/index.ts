import { Callback, Context, Handler } from "aws-lambda";
require("isomorphic-fetch");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_API_KEY);
import { updateUser } from "./update-user";

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
) => {
  if (event.arguments && event.arguments.sessionId && event.identity) {
    const sessionId: string = event.arguments.sessionId;
    try {
      const checkoutSession = await stripe.checkout.sessions.retrieve(
        sessionId
      );

      const customerId = checkoutSession.customer;

      await updateUser({
        cognitoSub: event.identity.sub,
        stripeCustomerId: customerId,
      });

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
