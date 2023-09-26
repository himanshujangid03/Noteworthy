function NoteComponent(props) {
  return (
    <div
      style={{
        margin: "1rem 2rem 2rem 0",
        padding: "2rem",
        borderRadius: "2rem",
        backgroundColor: "white",
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
        backdropFilter: "blur(3px)",
      }}
    >
      {props.children}
    </div>
  );
}

export default NoteComponent;
