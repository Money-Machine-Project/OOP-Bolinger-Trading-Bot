import getTradingTime from "./getTradingTime.js";
import getTimeInterval from "./getTimeInterval.js";
const checkTradingTimeExceed = (tradingTime) => {
    const nowTradingTime = getTimeInterval(getTradingTime(), 5);
    return Number(tradingTime) + 4 <= nowTradingTime.index ? true : false;
};
export default checkTradingTimeExceed;
