import React, { useState } from "react";

const AuthContext = React.createContext({
  user: String,
  refresh: Boolean,
  favourites: Array,
  setFavourites: () => {},
  setRefresh: () => {},
  query: String,
  setQuery: () => {},
  showSidePanel: Boolean,
  setShowSidePanel: () => {},
  setUser: () => {},
});

export const AuthContextProvider = (props) => {
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [user, setUser] = useState("");

  return (
    <>
      <AuthContext.Provider
        value={{
          user: user,
          setUser: setUser,
          refresh: refresh,
          setRefresh: setRefresh,
          favourites: favourites,
          setFavourites: setFavourites,
          query: query,
          setQuery: setQuery,
          showSidePanel: showSidePanel,
          setShowSidePanel: setShowSidePanel,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
