import getTradingTime from "./getTradingTime.js";
import getTimeInterval from "./getTimeInterval.js";
import { getValue } from "../db/redisManager.js";

/**
 * 거래 가능 체킹 함수
 * @param {string} operationType - 거래 유형 ('sell' 또는 'cutoff')
 * @returns {Promise<boolean>}
 */
const isTradingAllowed = async (operationType: string): Promise<boolean> => {
  const trading = await getValue("tradingTime");
  if (
    trading === null &&
    (operationType === "sell" || operationType === "cut")
  ) {
    return false;
  } else if (trading === null && operationType === "buy") {
    return true;
  }
  const [tradingTime, status] = trading.split("+");
  const newTradingTime = getTimeInterval(getTradingTime(), 5);
  if (String(tradingTime) === String(newTradingTime.index)) {
    if (status === "buy") {
      return operationType === "sell";
    }
    if (status === "sell") {
      return operationType === "buy";
    }
    return false;
  }
  if (status === operationType) {
    return false;
  }
  if (
    (status === "cut" && operationType === "sell") ||
    (status === "sell" && operationType === "cut")
  ) {
    return false;
  }
  return true;
};

export default isTradingAllowed;
