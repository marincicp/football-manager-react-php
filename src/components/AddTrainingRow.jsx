import PropTypes from "prop-types";
import Table from "./Table";

function AddTrainingRow({ item, change, index }) {
  return (
    <Table.Row>
      <td align="center">{index + 1}.</td>
      <td align="left">{item?.name}</td>
      <td align="center">
        <input
          onChange={(e) => change(item.player_id, e.target.checked)}
          name="attended"
          type="checkbox"
          className="w-8 h-8 accent-green-600 cursor-pointer"
        />
      </td>
    </Table.Row>
  );
}

export default AddTrainingRow;

AddTrainingRow.propTypes = {
  item: PropTypes.object,
  change: PropTypes.func,
  index: PropTypes.number,
};
