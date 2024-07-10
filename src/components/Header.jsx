import { Nav, Logo } from "./";

function Header() {
  return (
    <header className="bg-cust-grey-0 flex  flex-col">
      <Logo />
      <Nav />
    </header>
  );
}

export default Header;
