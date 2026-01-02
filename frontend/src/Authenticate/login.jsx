import React, { useState } from "react";
import { login } from "../Service/AuthenticationService";
import { saveToken, getUserFromToken } from "./auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const request = { username, password };

    try {
      const res = await login(request);
      const token = res.data.token;

      saveToken(token);
      const user = getUserFromToken();

      if (user.role === "PHARMACY") {
        navigate("/pharmacy/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
