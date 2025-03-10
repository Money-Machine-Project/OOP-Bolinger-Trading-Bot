import pool from "../config/db.js";
const dayTrade = async () => {
    const result = await pool.query("SELECT * FROM log WHERE DATE(created_at) = CURDATE()");
    return result[0];
};
const getYesterdayResult = async () => {
    const result = await pool.query(`
    SELECT * FROM day_result
    ORDER BY date DESC
    LIMIT 1
  `);
    return result[0];
};
export { dayTrade, getYesterdayResult };
