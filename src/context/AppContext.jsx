import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext();

const initialState = {
  user: null,
  players: [],
  totalDebt: 0,
  totalPaid: 0,
  laoding: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "getPlayers":
      return {
        ...state,
        loading: false,
        players: action.payload.players,
        totalDebt: +action.payload.total_debt,
        totalPaid: +action.payload.total_paid,
      };

    case "setLoading":
      return { ...state, loading: action.payload };
  }
}

export function AppContextProvider({ children }) {
  const [{ players, loading, totalDebt, totalPaid }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function increaseDebt(playerID) {
    dispatch({ type: "setLoading", payload: true });
    const payload = {
      player_id: playerID,
    };

    try {
      await fetch(`${BASE_URL}/players/addDebt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      await getAllPlayers();
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function decreaseDebt(playerID) {
    dispatch({ type: "setLoading", payload: true });
    const payload = {
      player_id: playerID,
    };

    try {
      await fetch(`${BASE_URL}/players/payEuro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      await getAllPlayers();
    } catch (err) {
      console.log(err);
    }
  }

  async function addNewTraining(payload) {
    try {
      dispatch({ type: "setLoading" });
      await fetch(`${BASE_URL}/training/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      await getAllPlayers();
    } catch (err) {
      console.log(err);
    }
  }

  async function addNewPlayer(payload) {
    dispatch({ type: "setLoading" });
    try {
      await fetch(`${BASE_URL}/players/addPlayer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      await getAllPlayers();
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function getAllPlayers() {
    try {
      const res = await fetch(`${BASE_URL}/players`);
      const data = await res.json();
      dispatch({ type: "getPlayers", payload: data });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <AppContext.Provider
      value={{
        getAllPlayers,
        players,
        loading,
        addNewTraining,
        addNewPlayer,
        totalPaid,
        totalDebt,
        decreaseDebt,
        increaseDebt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.obj,
};

export function useAppContext() {
  const context = useContext(AppContext);

  if (context == undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
