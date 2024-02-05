import { Link } from "react-router-dom";
import "./AuthPage.css";
import Logo from "../assets/NoteWorthy-logos_black.png";
import { motion } from "framer-motion";
import Button from "../ui/Button";

function AuthPage() {
  return (
    <>
      <div className="AuthPage">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1,  }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="AuthPage__info"
        >
          <img src={Logo} alt={Logo} />
          <h1>
            Welcome to <strong>Noteworthy</strong>
          </h1>
          <p className="p-tagline">your notes your way - accessible to all</p>

          <p className="p-get-started">Get Started</p>
          <div className="AuthPage__btns">
            <>
              <Link to={"/login"}>
                <Button size='large'>Login</Button>
              </Link>
              <Link to={"/signup"}>
                <Button>Signup</Button>
              </Link>
            </>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default AuthPage;
