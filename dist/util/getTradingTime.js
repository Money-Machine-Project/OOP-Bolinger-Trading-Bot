/**
 * 거래 가능 조회 전용 시간 조회 함수
 * @returns
 */
const getTradingTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
};
export default getTradingTime;
