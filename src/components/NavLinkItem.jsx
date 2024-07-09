import { NavLink } from "react-router-dom";

function NavLinkItem({ to, title }) {
  return (
    <li className="uppercase flex-1 flex justify-center items-center text-cust-grey-900 font-bold">
      <NavLink
        to={to}
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "border-b-4 border-cust-indigo-700 p-2 w-full text-center "
            : ""
        }
      >
        {title}
      </NavLink>
    </li>
  );
}

export default NavLinkItem;
