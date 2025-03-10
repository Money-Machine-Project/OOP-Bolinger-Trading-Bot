/**
 * 한국 날짜 조회 함수
 * @returns
 */
const getKoreaDate = () => {
    const koreaTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    const today = koreaTime.getFullYear() +
        String(koreaTime.getMonth() + 1).padStart(2, "0") +
        String(koreaTime.getDate()).padStart(2, "0");
    return today;
};
export default getKoreaDate;
