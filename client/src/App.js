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
import NewNote, {
  action as createNewNoteAction,
} from "./components/Notes/NewNote";
import EditNote from "./components/Notes/EditNote";
import Welcome from "./components/Notes/Welcome";
import Favourites from "./components/Notes/Favourites";
import GetNotes, {
  loader as getNotesLoader,
} from "./components/Notes/GetNotes";
import EditNoteModal from "./components/Notes/EditNoteModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <Error />,
    id: "get-notes",
    loader: getNotesLoader,
    children: [
      { index: true, element: <Welcome /> },
      { path: "new", element: <NewNote />, action: createNewNoteAction },
      { path: "get-notes", element: <GetNotes />, errorElement: <Error /> },
      {
        path: "edit",
        element: <EditNote />,
        errorElement: <Error />,
        children: [{ path: ":id", element: <EditNoteModal /> }],
      },

      { path: "fav", element: <Favourites /> },
    ],
  },
  { path: "/login", element: <Login />, id: "loginData", action: loginAction },
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
