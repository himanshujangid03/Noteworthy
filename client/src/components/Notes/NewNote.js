import { useContext } from "react";
import { Form, redirect } from "react-router-dom";
import { createNotesApi } from "../../utils/api";
import "./NewNote.css";

function NewNote(props) {
  return (
    <>
      <div className="new-note">
        <Form method="post">
          <input type="text" name="title" />
          <input type="text" name="content" />
          <button>Add</button>
        </Form>
      </div>
    </>
  );
}

export default NewNote;

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
