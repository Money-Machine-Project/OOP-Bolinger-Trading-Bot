const makeRsi = (historicalPrices, currentPrice, period) => {
    const price = historicalPrices.slice(0);
    const prices = [...price, currentPrice];
    const changes = [];
    for (let i = 1; i < prices.length; i++) {
        changes.push(Number(prices[i]) - Number(prices[i - 1]));
    }
    const gains = changes.map((change) => (change > 0 ? change : 0));
    const losses = changes.map((change) => (change < 0 ? Math.abs(change) : 0));
    const recentGains = gains.slice(-period);
    const recentLosses = losses.slice(-period);
    const avgGain = recentGains.reduce((sum, gain) => sum + gain, 0) / period;
    const avgLoss = recentLosses.reduce((sum, loss) => sum + loss, 0) / period;
    const rs = avgLoss === 0 ? 0 : avgGain / avgLoss;
    const rsi = avgLoss === 0 ? 100 : 100 - 100 / (1 + rs);
    return Number(rsi.toFixed(2));
};
export default makeRsi;
