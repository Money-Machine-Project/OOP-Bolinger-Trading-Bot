import pool from "../config/db.js";

const logInsert = async (
  information: string,
  symbol: string,
  tradingCount: number
) => {
  await pool.query(
    "INSERT INTO log(information, symbol, trading_count) VALUES(?,?,?)",
    [information, symbol, tradingCount]
  );
};

const resultInsert = async (
  date: string,
  money: string,
  profitRate: number
) => {
  await pool.query(
    "INSERT INTO day_result(date, money, profit_rate) VALUES(?,?,?)",
    [date, money, profitRate]
  );
};

export { logInsert, resultInsert };
