import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  user: Object,
  toggleModal: Boolean,
  favorites: Array,
  setFavourites: () => {},
  setToggleModal: () => {},
});

export const AuthContextProvider = (props) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [favorites, setFavourites] = useState([]);
  const [user, setUser] = useState(false);
  const fetchIsLoggedHandler = async () => {
    const response = await fetch("http://localhost:4000/user/profile", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }

    const resData = await response.json();
    if (resData) {
      setUser(resData);
    } else {
      setUser(false);
    }
  };
  useEffect(() => {
    fetchIsLoggedHandler();
  }, []);
  return (
    <>
      <AuthContext.Provider
        value={{
          user: user,
          toggleModal: toggleModal,
          setToggleModal: setToggleModal,
          favorites: favorites,
          setFavourites: setFavourites,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
