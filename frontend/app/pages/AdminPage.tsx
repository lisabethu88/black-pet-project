// app/AdminPage.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";
import { Box, Button, Grid } from "@mui/material";
import StoryCard from "~/components/StoryCard";
import { stories } from "~/data/DummyData";
import AdminStoryCard from "~/components/AdminStoryCard";

const allowedAdmins = ["lisabethu88@gmail.com"];

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({} as User);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user;
      const currentEmail = currentUser?.email;

      if (currentUser && currentEmail && allowedAdmins.includes(currentEmail)) {
        setUser(currentUser);
        setIsAdmin(true);
      } else {
        await supabase.auth.signOut();
        setIsAdmin(false);
      }

      setCheckingAuth(false);
    };

    checkSession();
  }, []);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else if (!data.user.email || !allowedAdmins.includes(data.user.email)) {
      await supabase.auth.signOut();
      alert("Unauthorized user");
    } else {
      setUser(data.user);
    }
  };

  if (checkingAuth) return <div>Loading...</div>;

  if (Object.keys(user).length === 0) {
    return (
      <form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="email"
          value={email}
          placeholder="Admin Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <h1>Welcome, Admin!</h1>
      <p>You're logged in as: {user?.email}</p>
      <Button
        onClick={async () => {
          await supabase.auth.signOut();
          setUser({} as User);
        }}
      >
        Log out
      </Button>
      <Box sx={{ padding: 5, flexGrow: 1 }}>
        <Grid container spacing={2}>
          {stories.map((story) => (
            <Grid key={story.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <AdminStoryCard story={story} isAdmin={isAdmin} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
