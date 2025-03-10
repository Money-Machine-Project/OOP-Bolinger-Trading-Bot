import {
  NPusStrategyFactory,
  UpDownStrategyFactory,
} from "./StrategyFactory.js";

async function main(price: string, accessToken: string) {
  const strategy = NPusStrategyFactory.createStrategy();
  const nplus = await strategy.exe(price, accessToken);
}

export default main;
