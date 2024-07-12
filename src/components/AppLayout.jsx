import { Outlet } from "react-router-dom";
import { Header } from "./";

function AppLayout() {
  return (
    <div className="grid h-screen sm:w-2/3 sm:m-auto bg-cust-grey-50 grid-rows-[auto_1fr]">
      <Header />

      <div>
        <main className="py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
