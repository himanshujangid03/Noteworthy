import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  user: Object,
  toggleModal: Boolean,
  setToggleModal: () => {},
});

export const AuthContextProvider = (props) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [user, setUser] = useState(false);
  const fetchIsLoggedHandler = async () => {
    const response = await fetch("http://localhost:4000/profile", {
      method: "GET",
      credentials: "include",
    });

    const resData = await response.json();
    if (resData) {
      setUser(resData);
    } else {
      setUser(false);
    }
  };
  useEffect(() => {
    fetchIsLoggedHandler();
  }, [user]);
  return (
    <>
      <AuthContext.Provider
        value={{
          user: user,
          toggleModal: toggleModal,
          setToggleModal: setToggleModal,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
