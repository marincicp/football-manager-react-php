import Loader from "react-js-loader";
import ".././index.css";
function Spinner() {
  return (
    <Loader
      bgColor="#1e40af"
      type="rectangular-ping"
      color="#1e40af"
      // size="120"
    />
  );
}

export default Spinner;
