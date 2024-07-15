import { useState } from "react";
import PropTypes from "prop-types";
import { useAppContext } from "../context/AppContext";

function AddPlayerForm({ setShowPlayerModal }) {
  const [name, setName] = useState("");
  const [godine, setGodine] = useState(null);

  const { addNewPlayer, loading } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      dob: godine,
    };
    setShowPlayerModal(false);
    await addNewPlayer(payload);
  };

  return (
    <div className="mt-16 p-2 flex flex-col items-center ">
      <p className="font-cust-grey-900 uppercase p-2 font-bold  mb-2 ">
        Dodaj novog igrača
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-10/12 p-4 bg-cust-gray-50 "
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-cust-grey-900 text-[1.4rem]">
            Ime
          </label>
          <input
            placeholder="Ivić I."
            type="text"
            name="name"
            className="py-2 px-4 rounded-md bg-cust-grey-200"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-cust-grey-900 text-[1.4rem]">
            Godine
          </label>
          <input
            type="number"
            name="name"
            placeholder="25"
            className="py-2 px-4 rounded-md bg-cust-grey-200"
            onChange={(e) => setGodine(e.target.value)}
            value={godine}
            required
            max={50}
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="w-4/12 bg-emerald-400 rounded-md p-2 uppercase text-white font-semibold disabled:opacity-25"
            disabled={loading}
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPlayerForm;

AddPlayerForm.propTypes = {
  setShowPlayerModal: PropTypes.func,
};
