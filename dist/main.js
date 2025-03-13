import { NPusStrategyFactory, } from "./StrategyFactory.js";
import { SubscriptionManager } from "./SubscriptionManager.js";
async function main(scheduler) {
    const strategy = NPusStrategyFactory.createStrategy();
    await SubscriptionManager.getInstance().addEvent("redis-flag");
    await SubscriptionManager.getInstance().addEvent("db-log");
    scheduler(strategy.exe);
}
export default main;
