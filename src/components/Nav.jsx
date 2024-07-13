import { NavLinkItem } from "./";

function Nav() {
  return (
    <nav className="bg-cust-grey-50 shadow-md">
      <ul className="flex justify-between ">
        <NavLinkItem to="/" title="Detalji" />
        <NavLinkItem to="/tablica" title="Tablica" />
        <NavLinkItem to="/seva" title="Ševa" />
      </ul>
    </nav>
  );
}

export default Nav;
