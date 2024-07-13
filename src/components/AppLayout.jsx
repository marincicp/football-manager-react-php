import { Outlet } from "react-router-dom";
import { Header } from "./";
import { AppContextProvider } from "../context/AppContext";

function AppLayout() {
  return (
    <AppContextProvider>
      <div className="grid h-screen sm:w-2/3 sm:m-auto bg-cust-grey-50 grid-rows-[auto_1fr]">
        <Header />

        {/* <div> */}
        <main>
          <Outlet />
        </main>
        {/* </div> */}
      </div>
    </AppContextProvider>
  );
}

export default AppLayout;
