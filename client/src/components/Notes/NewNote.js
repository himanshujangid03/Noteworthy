import { Form, redirect, useNavigation } from "react-router-dom";
import { createNotesApi } from "../../utils/api";
import "./NewNote.css";
import Loader from "../../ui/Loader";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Br from "../../ui/Br";

function NewNote(props) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  return (
    <>
      <div className="new-note">
        <Heading as={"h2"} type={"create"}>
          Create new note
        </Heading>
        <Br />
        <Form method="post">
          <input type="text" name="title" placeholder="Title" required />
          <textarea
            type="text"
            rows={"13"}
            name="content"
            placeholder="Write the content of the note here..."
            style={{ resize: "vertical" }}
            required
          />
          <Button
            isLoading={isLoading}
            style={{
              cursor: `${isLoading ? "not-allowed" : ""}`,
            }}
            type="createbtn"
          >
            Submit
          </Button>
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

  return redirect("/home/note/get-notes");
}
