import sgMail from "@sendgrid/mail";
import { Order } from "./types";

export default async function sendEmail({
  firstName,
  lastName,
  address,
  city,
  zip,
  phone,
  businessEmail,
  merch,
  gifts,
  paymentMethod,
  preferredStrain,
  quantity,
}: Order): Promise<any> {
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    console.log(process.env.SENDGRID_API_KEY);

    const newMessage = {
      to: businessEmail,
      subject: `${firstName} wants some merch!`,
      from: "butler@potluck.cc",
      text: `
      Hey, there! ${firstName} wants some merch!

      Name: ${firstName} ${lastName}
      Address: ${address}, ${city} ${zip}
      Phone: ${phone}
      Merch: ${merch.join(",")} terra cotta pot
      Suggested Gifts: ${gifts.join(",")}
      Preferred Strain: ${preferredStrain}
      Quantity: ${quantity}
      Payment Method(s): ${paymentMethod}

      This is an automated messge. Please don't reply.

      Thanks for using Potluck!
      `,
    };

    try {
      await sgMail.send(newMessage);
    } catch (e) {
      console.log(e);
    }
  } else throw new Error("API Key missing.");
}
