import { NPusStrategyFactory, } from "./StrategyFactory.js";
async function main(scheduler) {
    const strategy = await NPusStrategyFactory.createStrategy();
    scheduler(strategy.exe);
}
export default main;
