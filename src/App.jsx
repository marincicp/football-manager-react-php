import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout, Details, Payment } from "./components";
import { lazy, Suspense } from "react";

const Standings = lazy(() => import("./components/Standings"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Details />,
      },
      // {
      //   path: "/igraci",
      //   element: <Players />,
      // },
      {
        path: "/tablica",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Standings />,
          </Suspense>
        ),
      },
      {
        path: "/seva",
        element: <Payment />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
// lazy: () => import("./components/Standings"),
