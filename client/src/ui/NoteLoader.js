function NoteLoader() {
  const style = {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div style={style}>
      <span className="note-loader"></span>
    </div>
  );
}

export default NoteLoader;
