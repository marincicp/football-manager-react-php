import { PageLayout, PaymentRow, Spinner } from "../components";
import Table from "../components/Table";
import { FaEuroSign } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { useRef } from "react";
import { useAuthContext } from "../context/AuthContext";

function Payment() {
  const { players, totalPaid, totalDebt, loading } = useAppContext();
  const { user } = useAuthContext();
  const pageRef = useRef(null);

  return (
    <PageLayout ref={pageRef}>
      <PageLayout.Header>
        <h2 className="text-cust-grey-900 text-3xl px-6 font-bold">
          Evidencija o plaćanju
        </h2>
      </PageLayout.Header>

      <PageLayout.Body className="">
        {players && (
          <Table columns="3rem 1fr 8rem 11rem">
            <Table.Header header="# Ime Stanje " />
            <Table.Body
              data={players}
              render={(item, index) => (
                <PaymentRow index={index} key={item.player_id} item={item} />
              )}
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
