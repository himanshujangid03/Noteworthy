function Button({ children, bg, txt, darkbg, onClick }) {
  const btnStyle = {
    margin: "0rem 0.5rem 0 0.5rem",
    padding: "0.5rem 1rem 0.5rem 1rem",
    outline: "none",
    fontSize: "1.2rem",
    minWidth: "5rem",
    border: "none",
    borderRadius: "0.6rem",
    background: bg,
    color: txt,
    boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
    fontFamily: "Montserrat",
    fontWeight: "400",
  };

  return (
    <button onClick={onClick} style={btnStyle}>
      {children}
    </button>
  );
}

export default Button;
