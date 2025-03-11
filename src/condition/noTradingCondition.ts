import checkTradingTimeExceed from "../util/checkTradingTimeExceed.js";
import getNowDate from "../util/getNowDate.js";

const noTradingCondition = (tradingTime: string) => {
  if (
    tradingTime !== null &&
    (tradingTime.split("+")[1] === "sell" ||
      tradingTime.split("+")[1] === "buy") &&
    checkTradingTimeExceed(tradingTime.split("+")[0])
  ) {
    return true;
  }
  return false;
};

export default noTradingCondition;
