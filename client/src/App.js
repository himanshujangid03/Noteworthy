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
import NewNote from "./components/Notes/NewNote";
import EditNote from "./components/Notes/EditNote";
import Welcome from "./components/Notes/Welcome";
import AllNotes from "./components/Notes/AllNotes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "new", element: <NewNote /> },
      { path: "edit", element: <EditNote /> },
      { path: "all-notes", element: <AllNotes /> },
    ],
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
