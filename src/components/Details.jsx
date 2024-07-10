import { useEffect, useState } from "react";
import DetailRow from "./DetailRow";
import Table from "./Table";
import Modal from "./Modal";
import AddTrainingForm from "./AddTrainingForm";
import { HiPlus } from "react-icons/hi";
function Details() {
  const [players, setPlayers] = useState([null]);
  const [showModal, setShowModal] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${BASE_URL}/players`);
      const data = await res.json();
      setPlayers(data.players);
    }

    fetchData();
  }, [showModal]);

  if (players == null) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end px-6">
        {showModal && (
          <Modal onClick={() => setShowModal((prev) => !prev)}>
            <AddTrainingForm data={players} setShowModal={setShowModal} />
          </Modal>
        )}
        <div className="justify-self-end	">
          <button
            onClick={() => setShowModal((prev) => !prev)}
            className=" bg-gray-700 rounded-md text-white flex justify-center items-center uppercase gap-2 py-2 px-4"
          >
            <HiPlus /> <span className="text-[1.2rem]">Trening </span>
          </button>
        </div>
      </div>
      <div className="w-full px-2 shadow-md">
        <Table columns="2rem 1fr 5rem 7rem 6rem">
          <Table.Header header="# Ime Dob Trening" />

          <Table.Body
            data={players}
            render={(item) => <DetailRow item={item} />}
          />
        </Table>
      </div>
    </div>
  );
}

export default Details;
