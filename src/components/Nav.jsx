import { NavLinkItem } from "./";

function Nav() {
  return (
    <nav className="bg-cust-grey-100">
      <ul className="flex justify-between ">
        <NavLinkItem to="/" title="Detalji" />
        <NavLinkItem to="igraci" title="Igrači" />
        <NavLinkItem to="/tablica" title="Tablica" />
        <NavLinkItem to="/seva" title="Ševa" />
      </ul>
    </nav>
  );
}

export default Nav;
