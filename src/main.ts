import { promises } from "nodemailer/lib/xoauth2/index.js";
import {
  NPusStrategyFactory,
  UpDownStrategyFactory,
} from "./StrategyFactory.js";
import { SubscriptionManager } from "./SubscriptionManager.js";

async function main(
  scheduler: (
    strategy: (price: number, accessToken: string) => Promise<void>
  ) => void
) {
  const strategy = NPusStrategyFactory.createStrategy();
  await SubscriptionManager.getInstance().addEvent("redis-flag");
  await SubscriptionManager.getInstance().addEvent("db-log");
  scheduler(strategy.exe);
}

export default main;
