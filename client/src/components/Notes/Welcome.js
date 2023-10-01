import Heading from "../../ui/Heading";
import "./Welcome.css";

function Welcome() {
  /* const ctx = useContext(AuthContext);
  const name = data.name; */
  return (
    <>
      <div className="welcome__div">
        <div className="welcome">
          <div>
            <h3>Welcome to Noteworthy Notes - Your Digital Notebook</h3>
            <p>
              Get organized, stay productive, and never forget a thing with our
              Notes App. Whether you're jotting down ideas, making to-do lists,
              or keeping important information at your fingertips, we've got you
              covered.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
