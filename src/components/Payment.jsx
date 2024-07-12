import { useEffect, useState } from "react";
import { PaymentRow } from "./";
import Table from "./Table";
import { FaEuroSign } from "react-icons/fa";
// ZAVRSITI

function Payment() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [players, setPlayers] = useState([null]);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${BASE_URL}/players`);
      const data = await res.json();
      setPlayers(data.players);
      setTotalDebt(data.total_debt);
      setTotalPaid(data.total_paid);
    }

    fetchData();
  }, []);

  async function handleAddDebt(playerID) {
    const payload = {
      player_id: playerID,
    };

    const res = await fetch(`${BASE_URL}/players/addDebt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(res, "re");
  }

  async function handleAddCash(playerID) {
    const payload = {
      player_id: playerID,
    };

    const res = await fetch(`${BASE_URL}/players/payEuro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  return (
    <div className="h-screen p-4 flex  flex-col gap-6">
      <div>
        <h2 className="text-cust-grey-900 text-3xl px-6 font-bold">
          Evidencija o plaćanju
        </h2>
      </div>

      <div>
        <Table columns="3rem 1fr 8rem 11rem">
          <Table.Header header="# Ime Stanje Akcija" />
          <Table.Body
            data={players}
            render={(item) => (
              <PaymentRow
                handleAddCash={handleAddCash}
                handleAddDebt={handleAddDebt}
                totalPaid={totalPaid}
                totalDebt={totalDebt}
                item={item}
              />
            )}
          />
          <Table.Footer>
            <td></td>
            <Table.Cell align="right" className="bold uppercase text-2xl">
              Total :
            </Table.Cell>
            <Table.Cell
              align="center"
              className="flex justify-center items-center font-semibold gap-1"
            >
              <span className="text-[1.4rem]">
                {totalPaid} / {totalDebt}
              </span>
              <FaEuroSign size="1.5rem" />
            </Table.Cell>
            <td></td>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}

export default Payment;
