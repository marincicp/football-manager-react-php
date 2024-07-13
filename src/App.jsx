import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout, Details, Payment, ProtectedRoute } from "./components";
import { lazy, Suspense } from "react";
import { Login } from "./pages";

const Standings = lazy(() => import("./components/Standings"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Details />,
      },

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
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
