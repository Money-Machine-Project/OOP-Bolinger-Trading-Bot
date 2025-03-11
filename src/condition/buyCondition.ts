import { NoSubstitutionTemplateLiteral } from "typescript";

const buyCondition = (
  bPercent: number,
  currentHoldings: NoSubstitutionTemplateLiteral,
  rsi: number,
  stockPrice: number
) => {
  if (
    0.3 >= bPercent &&
    Number(currentHoldings) === 0 &&
    rsi <= 50 &&
    Math.floor(Number(stockPrice)) % 5 === 0
  ) {
    return true;
  }
  return false;
};

export default buyCondition;
