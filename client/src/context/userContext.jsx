import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const getUserInfo = async () => {
    try {
      const userInfo = await axios.get("/profile"); // be careful getting the data with axios
      setUser(userInfo.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
