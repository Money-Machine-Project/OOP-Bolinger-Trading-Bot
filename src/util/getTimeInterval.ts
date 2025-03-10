/**
 * 시간 간격별 index 번호 조회 함수
 * @param {*} time 시간
 * @param {*} intervalMinutes 간격
 * @returns
 */
const getTimeInterval = (time: string, intervalMinutes: number) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  const startMinutes = 9 * 60;
  const endMinutes = 20 * 60;

  if (totalMinutes < startMinutes || totalMinutes >= endMinutes) {
    return {
      index: null,
    };
  }

  const intervalIndex = Math.floor(
    (totalMinutes - startMinutes) / intervalMinutes
  );
  const intervalStart = startMinutes + intervalIndex * intervalMinutes;
  const intervalEnd = intervalStart + intervalMinutes;

  return {
    start: formatTime(intervalStart),
    end: formatTime(intervalEnd),
    index: intervalIndex,
  };
};

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}

export default getTimeInterval;
