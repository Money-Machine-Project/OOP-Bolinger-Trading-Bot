import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import dotenv from "dotenv";
import main from "./main.js";
import authLimiter from "./util/rateLimiter.js";
import { connectToRedis } from "./config/redis.js";
import pool from "./config/db.js";
import accessTokenScheduler from "./scheduler/accessTokenScheduler.js";
import { getValue } from "./db/redisManager.js";
import sellAllStocksScheduler from "./scheduler/sellAllStocksScheduler.js";
import dayResultScheduler from "./scheduler/dayResultScheduler.js";
import minuteCandleResetScheduler from "./scheduler/minuteCandleResetScheduler.js";
import getSecondStockScheduler from "./scheduler/getSecondStockScheduler.js";
import accessTokenManager from "./api/token/accessTokenManager.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(hpp());

app.use("/", authLimiter);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(403).send("Access Denied");
  }
);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    next(error);
  }
);

connectToRedis();
app.listen(process.env.DEV_PORT, async () => {
  console.log("🚩 Server Start 🚩", process.env.DEV_PORT);
  const connection = await pool.getConnection();
  console.log("MySQL Database connected successfully");
  connection.release();

  await accessTokenManager();

  accessTokenScheduler();
  //await webSocketKeyManage();
  const accessToken = await getValue("accessToken");
  sellAllStocksScheduler();
  dayResultScheduler(
    String(process.env.SYMBOL),
    String(process.env.SYMBOL_INVERSE)
  );
  minuteCandleResetScheduler();
  getSecondStockScheduler();
});
