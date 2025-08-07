"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Attempting to send email...");
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: config_1.config.node_env === "production", // Port 587 uses STARTTLS, so `secure` should be `false`
            auth: {
                user: "anis.devs@gmail.com", // Use environment variables
                pass: "ddxg nwfh ljck natz", // Use environment variables
            },
        });
        yield transporter.sendMail({
            from: "anis.devs@gmail.com",
            to,
            subject: "Hello Reset your password ✔",
            text: "Hello! have you forgot your pass?",
            html,
        });
        console.log("Email sent successfully! 🎉");
    }
    catch (error) {
        console.error("Failed to send email. Error:", error);
        // You can add more specific error handling here
    }
});
exports.sendEmail = sendEmail;
