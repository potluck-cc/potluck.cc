import sgMail from "@sendgrid/mail";
import { Order } from "./types";

export default async function sendEmail({
  name,
  city,
  phone,
  businessEmail,
  gifts,
  paymentMethod,
  preferredStrain,
  quantity,
}: Order): Promise<any> {
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const newMessage = {
      to: businessEmail,
      subject: `${name} wants some merch!`,
      from: "butler@potluck.cc",
      text: `
      Hey, there! ${name} wants some merch!

      Name: ${name}
      Address: ${city}
      Phone: ${phone}
      Suggested Gifts: ${gifts.join(",")}
      Preferred Strain: ${preferredStrain.join(",")}
      Quantity: ${quantity}
      Payment Method(s): ${paymentMethod}

      This is an automated messge. Please don't reply.

      Thanks for using Potluck!
      `,
    };

    try {
      await sgMail.send(newMessage);

      return true;
    } catch (e) {
      throw new Error(e);
    }
  } else throw new Error("API Key missing.");
}
