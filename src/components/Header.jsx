import { useAuthContext } from "../context/AuthContext";
import { Nav, Logo } from "./";
import { IoLogOutOutline } from "react-icons/io5";

function Header() {
  const { logout } = useAuthContext();

  return (
    <header className="bg-cust-grey-0 flex  flex-col ">
      <div className="flex justify-between items-center">
        <Logo />

        <button
          onClick={logout}
          className="bg-white justify-center flex items-center gap-2  p-4 rounded-md float-right disabled:opacity-35 text-blue-900 border-2 border-gray-200 shadow"
          // disabled={loading}
        >
          <IoLogOutOutline
            size="2em"
            className="bg-blue-900 text-white rounded-full p-2"
          />
          <span className="font-bold text-xl">Odjava </span>
        </button>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
