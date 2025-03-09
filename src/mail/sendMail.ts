import smtpTransport from "../config/smtpTransport.js";
import { emailTemplates } from "./mail.js";

const sendMail = async (templatesType: string, data: any) => {
  try {
    const template = emailTemplates[templatesType] as any;
    const mailOptions = {
      from: process.env.NODEEMAIL_FROM,
      to: process.env.NODEEMAIL_TO,
      subject: template.subject,
      html: template.content(data),
    };
    await smtpTransport.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (err) {
    console.error(err);
  }
};

export default sendMail;
