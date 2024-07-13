import { useState } from "react";
import AddTrainingRow from "./AddTrainingRow";
import Table from "./Table";
import PropTypes from "prop-types";
import { useAppContext } from "../context/AppContext";
function AddTrainingForm({ setShowTrainingModal }) {
  const { addNewTraining, players, loading } = useAppContext();
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
    await addNewTraining(payload);

    setShowTrainingModal(false);
  };

  const handleCheckboxChange = (id, checked) => {
    setPlayerData((prev) =>
      prev.map((player) =>
        player.player_id === id ? { ...player, attended: checked } : player
      )
    );
  };

  return (
    <div className="mt-16 p-2">
      <p className="font-cust-grey-900 uppercase p-2 font-bold  mb-2">
        Evidencija treninga
      </p>

      <form onSubmit={handleSubmit}>
        <Table columns="3rem 1fr  12rem">
          <Table.Header header="# Ime Odradio" />

          <Table.Body
            data={playersData}
            render={(item) => (
              <AddTrainingRow
                change={handleCheckboxChange}
                item={item}
                key={item.player_id}
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
