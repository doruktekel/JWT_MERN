import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, password, email } = data;

    try {
      const response = await axios.post("/register", {
        name,
        password,
        email,
      });
      setData({
        name: "",
        email: "",
        password: "",
      });
      toast.success("Regtistration is successfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="container-child">
      <form onSubmit={handleRegister} className="form">
        <div className="form-item">
          <label>Name</label>
          <input
            type="text"
            placeholder="..."
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
        </div>
        <div className="form-item">
          <label>Email</label>
          <input
            type="email"
            placeholder="..."
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </div>
        <div className="form-item">
          <label>Password</label>
          <input
            type="password"
            placeholder="..."
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
