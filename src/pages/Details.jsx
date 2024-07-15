import { useMemo, useState } from "react";
import Table from "../components/Table";
import {
  AddTrainingForm,
  AddPlayerForm,
  DetailRow,
  Modal,
  Spinner,
  PageLayout,
  Dropdown,
} from "../components";
import { HiPlus } from "react-icons/hi";
import { useAppContext } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";

function Details() {
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const { user } = useAuthContext();
  const { players, loading } = useAppContext();

  const prosjek = useMemo(() => {
    console.log("uso");
    return (
      players.reduce((count, player) => count + Number(player.dob), 0) /
      players.length
    );
  }, [players]);
  console.log(prosjek);
  return (
    <PageLayout className="">
      <PageLayout.Header className="flex justify-between px-6">
        <Dropdown />
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
        {!!user?.is_admin && (
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
        )}
      </PageLayout.Header>
      <PageLayout.Body className="">
        {loading ? (
          <Spinner />
        ) : (
          <Table columns="2rem 1fr 5rem 7rem 6rem">
            <Table.Header header="# Ime God. Trening" />

            <Table.Body
              data={players}
              render={(item, index) => (
                <DetailRow index={index} key={item.player_id} item={item} />
              )}
            />
            <Table.Footer className="bg-cust-grey-200 border-0">
              <td></td>
              <Table.Cell align="right" className="bold uppercase text-2xl">
                Prosjek :
              </Table.Cell>
              <Table.Cell
                align="center"
                className="flex justify-center items-center font-semibold gap-1"
              >
                <span className="text-[1.4rem]">
                  {prosjek?.toFixed(0) || "-"}
                </span>
              </Table.Cell>
            </Table.Footer>
          </Table>
        )}
      </PageLayout.Body>
    </PageLayout>
  );
}

export default Details;
