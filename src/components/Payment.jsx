import { PageLayout, PaymentRow, Spinner } from "./";
import Table from "./Table";
import { FaEuroSign } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { useRef } from "react";

function Payment() {
  const { players, totalPaid, totalDebt, loading } = useAppContext();
  const pageRef = useRef(null);
  console.log(pageRef.current, "ref", loading);

  return (
    <PageLayout className="bg-cust-grey-1" ref={pageRef} loading={loading}>
      <PageLayout.Header>
        <h2 className="text-cust-grey-900 text-3xl px-6 font-bold">
          Evidencija o plaćanju
        </h2>
      </PageLayout.Header>

      <PageLayout.Body className="shadow-lg min-h-screen">
        {players && (
          <Table columns="3rem 1fr 8rem 11rem" loading={loading}>
            <Table.Header header="# Ime Stanje " />
            <Table.Body
              data={players}
              render={(item) => <PaymentRow key={item.player_id} item={item} />}
            />
            <Table.Footer className="bg-cust-grey-200 border-0">
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
        )}
      </PageLayout.Body>
    </PageLayout>
  );
}

export default Payment;
