const buyTimingCondition = (tradingTime: string) => {
  if (
    tradingTime === null ||
    String(tradingTime.split("+")[1]) === "cut" ||
    String(tradingTime.split("+")[1]) === "sell"
  ) {
    return true;
  }
  return false;
};

export default buyTimingCondition;
