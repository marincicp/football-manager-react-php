import { Outlet } from "react-router-dom";
import { Header } from "./";
import { AppContextProvider } from "../context/AppContext";

function AppLayout() {
  return (
    <AppContextProvider>
      <div className="grid h-screen sm:w-2/3 xl:2/4 sm:m-auto lg:w-3/5 2xl:2/5  bg-cust-grey-50 grid-rows-[auto_1fr]">
        <Header />

        <main className="overflow-hidden rounded-xl">
          <Outlet />
        </main>
      </div>
    </AppContextProvider>
  );
}

export default AppLayout;
