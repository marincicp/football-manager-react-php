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
import { ACTION_TYPE } from "../constants/actionType";
const AppContext = createContext();

const initialState = {
  user: null,
  players: [],
  months: [],
  totalDebt: 0,
  totalPaid: 0,
  lastTrainingDate: "",
  laoding: true,
  query: "",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.GET_PLAYERS:
      return {
        ...state,
        loading: false,
        players: action.payload.players,
        totalDebt: +action.payload.total_debt,
        totalPaid: +action.payload.total_paid,
        lastTrainingDate: action.payload.last_training_date,
        query: action.payload.query,
      };

    case ACTION_TYPE.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTION_TYPE.GET_MONTHS:
      return { ...state, months: action.payload };
  }
}

export function AppContextProvider({ children }) {
  const [
    { players, loading, totalDebt, totalPaid, months, query, lastTrainingDate },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function increaseDebt(playerID) {
    dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
    try {
      await increaseDebtService(playerID);
      await getAllPlayers();

      toast.success("Plus uspješno dodan.");
    } catch (err) {
      toast.error("Greška. Pokušaj ponovo.");
    } finally {
      dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
    }
  }

  async function decreaseDebt(playerID) {
    dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

    try {
      await decreaseDebtService(playerID);
      await getAllPlayers();
      toast.success("1 € uspješno dodan.");
    } catch (err) {
      toast.error("Greška. Pokušaj ponovo.");
    } finally {
      dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
    }
  }

  async function addNewTraining(payload) {
    try {
      dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

      await addNewTrainingService(payload);
      await getAllPlayers();

      toast.success("Trening uspješno dodan.");
    } catch (err) {
      toast.error(err);
    } finally {
      dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
    }
  }

  async function addNewPlayer(payload) {
    dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
    try {
      await addNewPlayerService(payload);
      await getAllPlayers();

      toast.success("Igrač uspješno dodan.");
    } catch (err) {
      toast.error(err);
    } finally {
      dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
    }
  }

  async function getAllPlayers(filter = "") {
    dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
    try {
      const data = await getAllPlayersService(filter);

      const payload = { ...data, query: filter };
      dispatch({ type: ACTION_TYPE.GET_PLAYERS, payload });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
    }
  }

  async function getMonths() {
    try {
      const data = await getMonthsService();
      dispatch({ type: ACTION_TYPE.GET_MONTHS, payload: data.months });
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
        lastTrainingDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAppContext() {
  const context = useContext(AppContext);

  if (context == undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
