import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
  });
  return <GlobalContext.Provider value={{ user, setUser }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
