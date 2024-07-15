import { useState } from "react";
import AddTrainingRow from "./AddTrainingRow";
import Table from "./Table";
import PropTypes from "prop-types";
import { useAppContext } from "../context/AppContext";
import { formatDate } from "../utils/helpers";

function AddTrainingForm({ setShowTrainingModal }) {
  const { addNewTraining, players, loading, lastTrainingDate } =
    useAppContext();
  const [playersData, setPlayerData] = useState(players);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const playerData = playersData.map((player) => ({
      player_id: player.player_id,
      attended: player.attended ? 1 : 0,
    }));

    const payload = {
      players: playerData,
    };
    setShowTrainingModal(false);
    await addNewTraining(payload);
  };

  const handleCheckboxChange = (id, checked) => {
    setPlayerData((prev) =>
      prev.map((player) =>
        player.player_id === id ? { ...player, attended: checked } : player
      )
    );
  };

  return (
    <div className="mt-16">
      <div className="font-cust-grey-900  p-2 font-bold  mb-2 px-4 ">
        <p className="uppercase text-3xl">Evidencija treninga</p>
        <p className="text-[1.4rem] text-cust-grey-500 mt-2 ">
          Posljednji trening dodan: {formatDate(lastTrainingDate)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="shadow-2xl px-4">
        <Table columns="3rem 1fr  12rem">
          <Table.Header header="# Ime Odradio" />

          <Table.Body
            data={playersData}
            render={(item, index) => (
              <AddTrainingRow
                change={handleCheckboxChange}
                item={item}
                key={item.player_id}
                index={index}
              />
            )}
          />
        </Table>
        <div className="flex justify-end mt-6">
          <button
            disabled={loading}
            className="w-4/12 bg-emerald-400 rounded-md p-2 uppercase text-white font-semibold disabled:opacity-25"
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTrainingForm;

AddTrainingForm.propTypes = {
  setShowTrainingModal: PropTypes.func,
};
