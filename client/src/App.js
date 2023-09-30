import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout, { userLoader } from "./Pages/RootLayout";
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
import { loader as getNotesLoader } from "./components/Notes/GetNotes";
import EditNoteModal from "./components/Notes/EditNoteModal";
import GetNotes from "./components/Notes/GetNotes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: <Home />,
    id: "loginData",
    loader: userLoader,
    errorElement: <Error />,
    children: [
      { index: true, id: "login-Data", element: <Welcome /> },
      {
        path: "note",
        id: "get-notes",
        loader: getNotesLoader,
        children: [
          { index: true, element: <NewNote />, action: createNewNoteAction },
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
