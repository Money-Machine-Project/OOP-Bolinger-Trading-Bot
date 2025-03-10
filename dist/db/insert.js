import pool from "../config/db.js";
const logInsert = async (information, symbol, tradingCount) => {
    await pool.query("INSERT INTO log(information, symbol, trading_count) VALUES(?,?,?)", [information, symbol, tradingCount]);
};
const resultInsert = async (date, money, profitRate) => {
    await pool.query("INSERT INTO day_result(date, money, profit_rate) VALUES(?,?,?)", [date, money, profitRate]);
};
export { logInsert, resultInsert };
