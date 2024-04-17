import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="container-child">
      <h1>Dashboard</h1>
      <h2>{user && user.name}</h2>
    </div>
  );
};

export default Dashboard;
