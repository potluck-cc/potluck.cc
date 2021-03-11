import { Callback, Context, Handler } from "aws-lambda";
import sendEmail from "./send-email";
import { Order } from "./types";

export const handler: Handler = async (
  event: any,
  context: Context,
  cb: Callback
) => {
  console.log(event);
  if (event.order) {
    await sendEmail(event.order as Order);
  } else {
    throw new Error("order missing");
  }
};
