"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
async function sendEmail({ firstName, lastName, address, city, zip, phone, businessEmail, merch, gifts, paymentMethod, preferredStrain, quantity, }) {
    if (process.env.SENDGRID_API_KEY) {
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
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
            await mail_1.default.send(newMessage);
            return true;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    else
        throw new Error("API Key missing.");
}
exports.default = sendEmail;
