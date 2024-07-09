import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout, Details, Players, Standings } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Details />,
      },
      {
        path: "/igraci",
        element: <Players />,
      },
      {
        path: "/tablica",
        element: <Standings />,
      },
      {
        path: "/seva",
        element: <Standings />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
