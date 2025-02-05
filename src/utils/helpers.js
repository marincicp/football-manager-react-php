export function setBgColor(postotak, total) {
  if (postotak === 0 && Number(total) === 0) {
    return "bg-cust-gray-0";
  } else if (
    (postotak > 0 && postotak < 16) ||
    (postotak === 0 && Number(total) > 0)
  ) {
    return "bg-red-900";
  } else if (postotak > 15 && postotak < 30) {
    return "bg-red-800";
  } else if (postotak >= 30 && postotak < 45) {
    return "bg-red-700";
  } else if (postotak >= 45 && postotak < 55) {
    return "bg-yellow-500";
  } else if (postotak >= 55 && postotak < 60) {
    return "bg-yellow-200";
  } else if (postotak >= 60 && postotak < 70) {
    return "bg-lime-300";
  } else if (postotak >= 70 && postotak < 90) {
    return "bg-green-400";
  } else if (postotak >= 90 && postotak <= 100) {
    return "bg-green-500";
  }
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year}., ${hour}:${min} h`;
}
