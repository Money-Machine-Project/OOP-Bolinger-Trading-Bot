const getNowDate = () => {
  const now = new Date();
  return `${now.getFullYear().toString().padStart(2, "0")}-${(
    now.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
};

export default getNowDate;
