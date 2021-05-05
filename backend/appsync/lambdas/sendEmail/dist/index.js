"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const send_email_1 = __importDefault(require("./send-email"));
const handler = async (event, context, cb) => {
    console.log(event);
    if (event.arguments && event.arguments.input) {
        return await send_email_1.default(event.arguments.input);
    }
    else if (event.input) {
        return await send_email_1.default(event.input);
    }
    else {
        throw new Error("order missing");
    }
};
exports.handler = handler;
