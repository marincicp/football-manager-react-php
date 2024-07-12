import { useState } from "react";
import Table from "./Table";
import { AddTrainingForm, AddPlayerForm, DetailRow, Modal, Spinner } from "./";
import { HiPlus } from "react-icons/hi";
import { useAppContext } from "../context/AppContext";

function Details() {
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  const { players, loading } = useAppContext();

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col gap-6 bg-red-500 h-screnn">
      <div className="flex justify-end px-6">
        {showTrainingModal && (
          <Modal onClick={() => setShowTrainingModal((prev) => !prev)}>
            <AddTrainingForm
              data={players}
              setShowTrainingModal={setShowTrainingModal}
            />
          </Modal>
        )}
        {showPlayerModal && (
          <Modal onClick={() => setShowPlayerModal((prev) => !prev)}>
            <AddPlayerForm
              data={players}
              setShowPlayerModal={setShowPlayerModal}
            />
          </Modal>
        )}
        <div className="flex gap-2 justify-self-end	">
          <button
            onClick={() => setShowPlayerModal((prev) => !prev)}
            className=" bg-gray-700 rounded-md text-white flex justify-center items-center uppercase gap-2 py-2 px-4"
          >
            <HiPlus /> <span className="text-[1.2rem]">Player </span>
          </button>
          <button
            onClick={() => setShowTrainingModal((prev) => !prev)}
            className=" bg-gray-700 rounded-md text-white flex justify-center items-center uppercase gap-2 py-2 px-4"
          >
            <HiPlus /> <span className="text-[1.2rem]">Trening </span>
          </button>
        </div>
      </div>
      <div className="w-full px-2 shadow-md bg-blue-800 h-[100px]">
        <Table columns="2rem 1fr 5rem 7rem 6rem">
          <Table.Header header="# Ime Dob Trening" />

          <Table.Body
            data={players}
            render={(item) => <DetailRow key={item.player_id} item={item} />}
          />
        </Table>
      </div>
    </div>
  );
}

export default Details;
