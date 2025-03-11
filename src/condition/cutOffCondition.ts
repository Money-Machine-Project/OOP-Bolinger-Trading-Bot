import { getValue } from "../db/redisManager.js";

const cutOffCondition = async (
  canCutOff: boolean,
  sellPrice: number,
  realTimeData: number,
  data: any
) => {
  if (
    canCutOff &&
    sellPrice !== null &&
    Number(sellPrice) > Number(realTimeData) &&
    Number(data.output1[0].hldg_qty) === Number(await getValue("buyCount"))
  ) {
    return true;
  }
  return false;
};

export default cutOffCondition;
