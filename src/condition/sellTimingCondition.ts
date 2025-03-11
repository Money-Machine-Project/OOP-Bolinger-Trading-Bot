const sellTimingCondition = (tradingTime: string) => {
  if (tradingTime !== null && tradingTime.split("+")[1] === "buy") {
    return true;
  }
  return false;
};

export default sellTimingCondition;
