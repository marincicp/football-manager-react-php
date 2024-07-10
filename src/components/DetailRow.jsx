import PropTypes from "prop-types";
import { setBgColor } from "../utils";
import Table from "./Table";

function DetailRow({ item }) {
  const postotak =
    (Number(item?.attended_trainings) / Number(item?.total_trainings)) * 100;
  const bg = setBgColor(postotak, item?.total_trainings);

  return (
    <Table.Row>
      <td align="center">{item?.player_id}.</td>
      <td align="left">{item?.name}</td>
      <td align="center">{item?.dob}</td>
      <td align="center">
        {item?.attended_trainings || 0} / {item?.total_trainings || 0}
      </td>
      <td
        align="center"
        className={`${bg} rounded-md text-white font-bold p-2 text-2xl`}
      >
        {item?.total_trainings > 0 ? postotak.toFixed(0) + " %" : "-"}
      </td>
    </Table.Row>
  );
}

export default DetailRow;

DetailRow.propTypes = {
  item: PropTypes.obj,
};
