import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(hpp());
//app.use("/", authLimiter);
app.use((req, res, next) => {
    res.status(403).send("Access Denied");
});
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    next(error);
});
app.listen(process.env.DEV_PORT, async () => {
    console.log("🚩 Server Start 🚩", process.env.DEV_PORT);
});
