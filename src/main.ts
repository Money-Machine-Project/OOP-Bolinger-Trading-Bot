import {
  NPusStrategyFactory,
  UpDownStrategyFactory,
} from "./StrategyFactory.js";

async function main(
  scheduler: (
    strategy: (price: number, accessToken: string) => Promise<void>
  ) => void
) {
  const strategy = await NPusStrategyFactory.createStrategy();
  scheduler(strategy.exe);
}

export default main;
