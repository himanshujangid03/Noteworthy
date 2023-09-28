import { Form, redirect, useNavigation } from "react-router-dom";
import { createNotesApi } from "../../utils/api";
import "./NewNote.css";
import DotLoader from "../../ui/DotLoader";
import { useContext } from "react";
import AuthContext from "../../utils/auth-context";

function EditNoteModal({ closeModal, item }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={() => closeModal(false)}></div>
        <div className="modal-content">
          <div className="new-note">
            <Form method="post">
              <input
                type="text"
                name="title"
                placeholder="Title"
                defaultValue={item.title}
              />
              <textarea
                type="text"
                rows={"13"}
                name="content"
                placeholder="Content"
                defaultValue={item.content}
              />
              <button>{`${isLoading ? <DotLoader /> : "Submit"} `}</button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditNoteModal;

export async function action({ request, parmas }) {
  const data = await request.formData();
  const noteData = {
    title: data.get("title"),
    content: data.get("content"),
  };
  console.log(noteData);

  const response = await fetch(createNotesApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(noteData),
  });
  if (!response.ok) {
    return response;
  }

  return redirect("/home/get-notes");
}
