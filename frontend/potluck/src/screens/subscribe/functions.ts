import { startCheckoutSession } from "graphql/mutations";

type StripeToken = {
  card: {};
  client_ip: string;
  created: number;
  email: string;
  id: string;
  object: string;
  type: string;
  used: boolean;
  livemode: boolean;
};

const priceIdLive = "price_1ITzUdLKwcvtvXgDABTGhIV8";
const priceIdTest = "price_1ITwLcLKwcvtvXgDUGwXULKC";

export async function createStripeSession() {
  const res = await startCheckoutSession({ priceId: priceIdTest });

  //@ts-ignore
  return res.data.startCheckoutSession;
}

export function subscribe() {
  return true;
}

export function cancelSubscription() {
  return true;
}
