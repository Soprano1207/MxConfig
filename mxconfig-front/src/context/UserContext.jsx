import React from "react";
import UserStore from "../store/user-store";

export const UserContext = React.createContext(UserStore);
export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={UserStore}>
      {children}
    </UserContext.Provider>
  );
};