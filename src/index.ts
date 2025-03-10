import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import dotenv from "dotenv";
import main from "./main.js";
import authLimiter from "./util/rateLimiter.js";
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

app.listen(process.env.DEV_PORT, async () => {
  console.log("🚩 Server Start 🚩", process.env.DEV_PORT);
});
