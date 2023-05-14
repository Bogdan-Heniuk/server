import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "bohdantest330@gmail.com",
    pass: "xmzpycsbcbiafcfe",
    clientId:
      "371315528592-cj3qqknsfojq4cagpbrsjedld01fredi.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04sCoUjTEPsraCgYIARAAGAQSNwF-L9Ir62EC0ZDAqx1M5wNul88DHwQq9zaS1meji6HEQox8tmecaj1tlyeOHZrYxBR1ZtOjOSE",
  },
});
