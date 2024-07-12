import { useState } from "react";
import AddTrainingRow from "./AddTrainingRow";
import Table from "./Table";
import PropTypes from "prop-types";

function AddTrainingForm({ data, setShowModal }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [players1, setplayers] = useState(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const playerData = players1.map((player) => ({
      player_id: player.player_id,
      attended: player.attended ? 1 : 0,
    }));

    const payload = {
      players: playerData,
    };

    await fetch(`${BASE_URL}/training/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setShowModal(false);
  };

  const handleCheckboxChange = (id, checked) => {
    setplayers((prev) =>
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
            data={players1}
            render={(item) => (
              <AddTrainingRow change={handleCheckboxChange} item={item} />
            )}
          />
        </Table>
        <div className="flex justify-end mt-6">
          <button className="w-4/12 bg-emerald-400 rounded-md p-2 uppercase text-white font-semibold">
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTrainingForm;

AddTrainingForm.propTypes = {
  data: PropTypes.obj,
  setShowModal: PropTypes.func,
};
