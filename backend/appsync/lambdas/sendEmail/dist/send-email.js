"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
async function sendEmail({ name, city, phone, businessEmail, gifts, paymentMethod, preferredStrain, quantity, }) {
    if (process.env.SENDGRID_API_KEY) {
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
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
