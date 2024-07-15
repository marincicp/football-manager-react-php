import { useAppContext } from "../context/AppContext";
import { MONTHS } from "../constants";

function Dropdown() {
  const { months, getAllPlayers, query } = useAppContext();
  const handleChange = async (e) => {
    await getAllPlayers(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      id="dropdown"
      className="bg-cust-grey-200 rounded-md text-cust-grey-900 flex justify-center items-center  gap-2 py-2 px-4 shadow-xl focus:outline-0 focus:ring-2 focus:ring-cust-grey-300"
      value={query}
    >
      <option value="">Ukupno</option>
      {months.map((month) => (
        <option key={month.month} value={month.month}>
          {MONTHS[month.month]}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
