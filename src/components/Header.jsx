import { useAuthContext } from "../context/AuthContext";
import { Nav, Logo } from "./";
import { IoLogOutOutline } from "react-icons/io5";

function Header() {
  const { logout } = useAuthContext();

  return (
    <header className="bg-cust-grey-0 flex  flex-col ">
      <div className="flex justify-between items-center px-4">
        <Logo />
        <button
          onClick={logout}
          className="bg- justify-center flex items-center gap-2  p-1 rounded-xl  disabled:opacity-35 text-blue-900 border-1 shadow-xl border-gray-300  text-xl"
          // disabled={loading}
        >
          <IoLogOutOutline
            size="3rem"
            className="bg-cust-grey-100 text-blue-900 rounded-lg p-1"
          />
          <span className="font-bold text-lg">Odjava </span>
        </button>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
