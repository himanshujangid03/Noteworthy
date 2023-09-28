import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { editNotesApi } from "../../utils/api";
import "./NewNote.css";
import Loader from "../../ui/Loader";

function EditNoteModal({ closeModal, item }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  return (
    <>
      <div className="modal">
        <Link to={""}>
          <div className="overlay" onClick={() => closeModal(false)}></div>
        </Link>
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
              <button>{`${isLoading ? <Loader /> : "Submit"} `}</button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditNoteModal;

export async function action({ request, params }) {
  const noteId = params.noteId;
  console.log(noteId);
  const data = await request.formData();
  const noteData = {
    title: data.get("title"),
    content: data.get("content"),
  };

  const response = await fetch(editNotesApi, {
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
