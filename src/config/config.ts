import dotenv from "dotenv";
dotenv.config();

const config = {
  appkey:
    process.env.TRADING_STATUS === "virtual"
      ? process.env.APP_KEY_VIRTUAL
      : process.env.APP_KEY_REAL,
  appsecret:
    process.env.TRADING_STATUS === "virtual"
      ? process.env.APP_SECRET_VIRTUAL
      : process.env.APP_SECRET_REAL,

  frontAccount:
    process.env.TRADING_STATUS === "virtual"
      ? process.env.FRONT_ACCOUNT_VIRTUAL
      : process.env.FRONT_ACCOUNT_REAL,

  backAccount:
    process.env.TRADING_STATUS === "virtual"
      ? process.env.BACK_ACCOUNT_VIRTUAL
      : process.env.BACK_ACCOUNT_REAL,

  symbol: process.env.SYMBOL,
  symbolInverse: process.env.SYMBOL_INVERSE,
  status: process.env.TRADING_STATUS,
  baseUrl:
    process.env.TRADING_STATUS === "virtual"
      ? "https://openapivts.koreainvestment.com:29443"
      : "https://openapi.koreainvestment.com:9443",
};

export default config;
