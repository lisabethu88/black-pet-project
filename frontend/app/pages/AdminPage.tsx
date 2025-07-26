// app/AdminPage.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";
import { Box, Button, Grid } from "@mui/material";
import AdminStoryCard from "~/components/AdminStoryCard";
import type { StoryType } from "~/types";
import LoadingCircle from "~/components/LoadingCircle";

const allowedAdmins = ["lisabethu88@gmail.com"];

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({} as User);
  const [checkingAuth, setCheckingAuth] = useState(true);
  // Data
  const [stories, setStories] = useState<StoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Auth
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user;
      const currentEmail = currentUser?.email;

      if (currentUser && currentEmail && allowedAdmins.includes(currentEmail)) {
        setUser(currentUser);
      } else {
        await supabase.auth.signOut();
      }

      setCheckingAuth(false);
    };

    checkSession();

    // Data
    fetch("http://localhost:8000/fetch_stories.php")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setStories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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

  if (checkingAuth) return <LoadingCircle />;

  if (Object.keys(user).length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
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
      </Box>
    );
  }

  if (loading) return <LoadingCircle />;
  if (error) return null;
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
            <Grid
              height="min-content"
              key={story.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            >
              <AdminStoryCard story={story} setStories={setStories} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
