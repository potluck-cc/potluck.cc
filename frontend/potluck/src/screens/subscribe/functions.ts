import { startCheckoutSession } from "graphql/mutations";

const priceIdLive = "price_1ITzUdLKwcvtvXgDABTGhIV8";
// const priceIdTest = "price_1ITwLcLKwcvtvXgDUGwXULKC";

export async function createStripeSession() {
  const res = await startCheckoutSession({ priceId: priceIdLive });

  //@ts-ignore
  return res.data.startCheckoutSession;
}

export function subscribe() {
  return true;
}

export function cancelSubscription() {
  return true;
}
