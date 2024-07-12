import { PaymentRow } from "./";
import Table from "./Table";
import { FaEuroSign } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

function Payment() {
  const { players, totalPaid, totalDebt } = useAppContext();

  //   if (loading) return <Spinner />;

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
            render={(item) => <PaymentRow key={item.player_id} item={item} />}
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
