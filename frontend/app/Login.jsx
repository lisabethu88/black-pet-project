import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom"; // or your routing solution

const allowedAdmins = ["admin@example.com"];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else if (!allowedAdmins.includes(data.user.email)) {
      await supabase.auth.signOut();
      alert("Unauthorized: not an admin");
    } else {
      navigate("/admin");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Admin Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
