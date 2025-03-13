const getBolingerBands = (historicalPrices, currentPrice, multiplier) => {
    const prices = [...historicalPrices, currentPrice];
    // 단순 이동평균 (SMA) 계산
    const sma = prices.reduce((sum, price) => sum + Number(price), 0) / prices.length;
    const squaredDiffs = prices.map((price) => Math.pow(Number(price) - sma, 2));
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);
    const upperBand = sma + standardDeviation * multiplier;
    const lowerBand = sma - standardDeviation * multiplier;
    const bPercent = (currentPrice - lowerBand) / (upperBand - lowerBand);
    return {
        upperBand: Number(upperBand.toFixed(2)),
        middleBand: Number(sma.toFixed(2)),
        lowerBand: Number(lowerBand.toFixed(2)),
        bPercent: Number(bPercent.toFixed(2)),
    };
};
export default getBolingerBands;
