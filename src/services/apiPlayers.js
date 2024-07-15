const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function increaseDebtService(playerID) {
  const payload = {
    player_id: playerID,
  };

  const res = await fetch(`${BASE_URL}/players/addDebt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Greška. Pokušaj ponovo.");
  }

  return res;
}

export async function decreaseDebtService(playerID) {
  const payload = {
    player_id: playerID,
  };

  const res = await fetch(`${BASE_URL}/players/payEuro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Greška. Pokušaj ponovo.");
  }

  return res;
}

export async function getMonthsService() {
  const res = await fetch(`${BASE_URL}/training/getMonths`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function addNewTrainingService(payload) {
  const res = await fetch(`${BASE_URL}/training/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Greška prilikom dodavanja treninga.");
  }

  return res;
}

export async function addNewPlayerService(payload) {
  const res = await fetch(`${BASE_URL}/players/addPlayer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Greška prilikom dodavanja igrača.");
  }

  return res;
}

export async function getAllPlayersService(filter = "") {
  let url = `${BASE_URL}/players`;

  if (filter) {
    url += `?month=${filter.toLowerCase()}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data?.message || "Greška. Pokušaj ponovo.");
  return data;
}
