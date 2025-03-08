import { NPusStrategyFactory, } from "./StrategyFactory.js";
function main() {
    const strategy = NPusStrategyFactory.createStrategy();
    const nplus = strategy.exe();
}
export default main;
