import Table from "./Table";
import { FaEuroSign, FaPlus } from "react-icons/fa";
import PropTypes from "prop-types";
import { useAppContext } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";

function PaymentRow({ item, index }) {
  const { user } = useAuthContext();
  const showAddEuro = +item?.debt === +item?.paid;
  const { decreaseDebt, increaseDebt, loading } = useAppContext();

  return (
    <Table.Row>
      <Table.Cell align="center">{index + 1}.</Table.Cell>
      <Table.Cell align="left">{item?.name}</Table.Cell>
      <Table.Cell align="center">
        {item?.paid} / {item?.debt}
      </Table.Cell>
      {!!user?.is_admin && (
        <Table.Cell>
          <button
            onClick={() => increaseDebt(item?.player_id)}
            className="bg-orange-300 flex  justify-center items-center gap-2 uppercase text-base p-2 rounded float-left disabled:opacity-35"
            disabled={loading}
          >
            <span className="font-bold">Add </span> <FaPlus size="1.5em" />
          </button>

          {!showAddEuro && (
            <button
              onClick={() => decreaseDebt(item?.player_id)}
              className="bg-green-400 justify-center flex items-center gap-2 uppercase text-base p-2 rounded float-right disabled:opacity-35"
              disabled={loading}
            >
              <span className="font-bold">Add </span>{" "}
              <FaEuroSign size="1.5em" />
            </button>
          )}
        </Table.Cell>
      )}
    </Table.Row>
  );
}

export default PaymentRow;

PaymentRow.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  handleAddDebt: PropTypes.func,
  handleAddCash: PropTypes.func,
};
