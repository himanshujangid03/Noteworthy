import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import Error from "./Pages/Error";
import Login, {
  action as loginAction,
} from "./components/Authentication/Login";
import Signup, {
  action as signupAction,
} from "./components/Authentication/Signup";
import Home from "./Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: "/login", element: <Login />, action: loginAction },
  { path: "/signup", element: <Signup />, action: signupAction },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
