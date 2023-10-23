import styled from "styled-components";
import successIcon from "../assets/success.svg";
import { AnimatePresence, motion } from "framer-motion";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "1rem",
  padding: "1rem",
  color: "black",
  background: "white",
  width: "30rem",
  maxWidth: "80%",
  margin: "1rem auto",
};

const Div = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const P = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  margin-left: 1rem;
`;

const Img = styled.img`
  width: 3rem;
  height: 3rem;
`;

function MessageModal() {
  return (
    <Div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        style={divStyle}
      >
        <Img src={successIcon} alt={successIcon} />
        <P> Successfully updated</P>
      </motion.div>
    </Div>
  );
}

export default MessageModal;
