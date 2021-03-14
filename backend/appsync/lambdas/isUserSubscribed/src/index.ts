import { Callback, Context, Handler } from "aws-lambda";
require("isomorphic-fetch");
import Stripe from "stripe";
import { getUser } from "./get-user";
//@ts-ignore
const stripe = new Stripe(process.env.STRIPE_API_KEY);

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
) => {
  console.log(event);

  if (event.source && event.source.stripeCustomerId) {
    const stripeCustomerId: string = event.source.stripeCustomerId;
    return await determineIfUserIsSubscribed(stripeCustomerId);
  } else if (event.identity && event.identity.sub) {
    const user = await getUser({ cognitoSub: event.identity.sub });
    return await determineIfUserIsSubscribed(user.stripeCustomerId);
  } else if (event.stripeCustomerId) {
    return await determineIfUserIsSubscribed(event.stripeCustomerId);
  } else {
    throw new Error("customer missing from event body");
  }
};

async function determineIfUserIsSubscribed(
  customerId: string
): Promise<boolean> {
  try {
    const subscriptions = await stripe.subscriptions.list({
      limit: 1,
      customer: customerId,
      status: "active",
    });
    const isUserSubscribed = Boolean(subscriptions.data.length);
    return isUserSubscribed;
  } catch (e) {
    throw new Error(e);
  }
}
