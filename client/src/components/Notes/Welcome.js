import "./Welcome.css";
import { motion } from "framer-motion";

function Welcome() {
  /* const ctx = useContext(AuthContext);
  const name = data.name; */
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="welcome__div">
          <div className="welcome">
            <div>
              <h3>Welcome to Noteworthy Notes - Your Digital Notebook</h3>
              <p>
                Get organized, stay productive, and never forget a thing with
                our Notes App. Whether you're jotting down ideas, making to-do
                lists, or keeping important information at your fingertips,
                we've got you covered.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Welcome;
