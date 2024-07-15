import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {
  addNewPlayerService,
  addNewTrainingService,
  decreaseDebtService,
  getAllPlayersService,
  getMonthsService,
  increaseDebtService,
} from "../services/apiPlayers";
const AppContext = createContext();

const initialState = {
  user: null,
  players: [],
  months: [],
  totalDebt: 0,
  totalPaid: 0,
  laoding: true,
  query: "",
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
    case "getMonths":
      return { ...state, months: action.payload };
  }
}

export function AppContextProvider({ children }) {
  const [{ players, loading, totalDebt, totalPaid, months, query }, dispatch] =
    useReducer(reducer, initialState);

  async function increaseDebt(playerID) {
    dispatch({ type: "setLoading", payload: true });
    try {
      await increaseDebtService(playerID);
      await getAllPlayers();

      toast.success("Plus uspješno dodan.");
    } catch (err) {
      toast.error("Greška. Pokušaj ponovo.");
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function decreaseDebt(playerID) {
    dispatch({ type: "setLoading", payload: true });

    try {
      await decreaseDebtService(playerID);
      await getAllPlayers();
      toast.success("1 € uspješno dodan.");
    } catch (err) {
      toast.error("Greška. Pokušaj ponovo.");
    }
  }

  async function addNewTraining(payload) {
    try {
      dispatch({ type: "setLoading", payload: true });

      await addNewTrainingService(payload);
      await getAllPlayers();

      toast.success("Trening uspješno dodan.");
    } catch (err) {
      toast.error(err);
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function addNewPlayer(payload) {
    dispatch({ type: "setLoading", payload: true });
    try {
      await addNewPlayerService(payload);
      await getAllPlayers();

      toast.success("Igrač uspješno dodan.");
    } catch (err) {
      toast.error(err);
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function getAllPlayers(filter = "") {
    dispatch({ type: "setLoading", payload: true });
    try {
      const data = await getAllPlayersService(filter);
      dispatch({ type: "getPlayers", payload: data });
    } catch (err) {
      console.log(err);
    }
  }

  async function getMonths() {
    try {
      const data = await getMonthsService();
      dispatch({ type: "getMonths", payload: data.months });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllPlayers();
    getMonths();
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
        months,
        query,
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
