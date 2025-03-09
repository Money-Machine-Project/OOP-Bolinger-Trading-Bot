import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const smtpTransport = nodemailer.createTransport({
  service: "gmail", // 사용하고자 하는 서비스
  host: "smtp.gmail.com", // host를 gmail로 설정
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});
export default smtpTransport;
