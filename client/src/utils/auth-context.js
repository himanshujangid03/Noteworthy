import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  user: Object,
  refresh: Boolean,
  favourites: Array,
  setFavourites: () => {},
  setRefresh: () => {},
  query: String,
  setQuery: () => {},
});

export const AuthContextProvider = (props) => {
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [favourites, setFavourites] = useState([]);
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
          refresh: refresh,
          setRefresh: setRefresh,
          favourites: favourites,
          setFavourites: setFavourites,
          query: query,
          setQuery: setQuery,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
