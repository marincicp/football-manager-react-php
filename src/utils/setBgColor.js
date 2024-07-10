export default function setBgColor(postotak, total) {
  console.log(postotak, total, "postotak");
  let boja;
  if (postotak === 0 && Number(total) === 0) {
    return (boja = "bg-cust-gray-0");
  } else if (
    (postotak > 0 && postotak < 16) ||
    (postotak === 0 && Number(total) > 0)
  ) {
    return (boja = "bg-red-900");
  } else if (postotak > 15 && postotak < 30) {
    return (boja = "bg-red-700");
  } else if (postotak >= 30 && postotak < 45) {
    return (boja = "bg-red-500");
  } else if (postotak >= 45 && postotak < 55) {
    return (boja = "bg-yellow-400");
  } else if (postotak >= 55 && postotak < 70) {
    // return (boja = "bg-lime-500");
    return (boja = "bg-cust-lime-400");
  } else if (postotak >= 70 && postotak < 90) {
    return (boja = "bg-green-400");
  } else if (postotak >= 90 && postotak <= 100) {
    return (boja = "bg-green-500");
  }
}
