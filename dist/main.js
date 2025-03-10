import { NPusStrategyFactory, } from "./StrategyFactory.js";
async function main(price, accessToken) {
    const strategy = NPusStrategyFactory.createStrategy();
    const nplus = await strategy.exe();
}
export default main;
