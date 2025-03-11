import { getValue } from "../db/redisManager.js";

const sellCondition = async (
  bPercent: number,
  currentHoldings: number,
  buyPrice: number,
  realTimeData: number
) => {
  if (
    Number(currentHoldings) === Number(await getValue("buyCount")) &&
    Number(realTimeData) >= Number(buyPrice) + 5
    // ||0.7 <= bPercent
  ) {
    return true;
  }
  return false;
};

export default sellCondition;
