import Table from "./Table";
import { FaEuroSign, FaPlus } from "react-icons/fa";
import PropTypes from "prop-types";

function PaymentRow({ item, handleAddDebt, handleAddCash }) {
  const showAddEuro = +item?.debt === +item?.paid;
  return (
    <Table.Row>
      <Table.Cell align="center">{item?.player_id} .</Table.Cell>
      <Table.Cell align="left">{item?.name}</Table.Cell>
      <Table.Cell align="center">
        {item?.paid} / {item?.debt}
      </Table.Cell>
      <Table.Cell>
        <button
          onClick={() => handleAddDebt(item?.player_id)}
          className="bg-orange-300 flex  justify-center items-center gap-2 uppercase text-base p-2 rounded float-left"
        >
          <span className="font-bold">Add </span> <FaPlus size="1.5em" />
        </button>

        {!showAddEuro && (
          <button
            onClick={() => handleAddCash(item?.player_id)}
            className="bg-green-400 justify-center flex items-center gap-2 uppercase text-base p-2 rounded float-right"
          >
            <span className="font-bold">Add </span> <FaEuroSign size="1.5em" />
          </button>
        )}
      </Table.Cell>
    </Table.Row>
  );
}

export default PaymentRow;

PaymentRow.propTypes = {
  item: PropTypes.obj,
  handleAddDebt: PropTypes.func,
  handleAddCash: PropTypes.func,
};
