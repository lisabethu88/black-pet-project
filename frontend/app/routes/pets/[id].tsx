import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "~/supabaseClient";
import { Typography } from "@mui/material";
import StoryPage from "~/pages/StoryPage";
import { stories } from "~/data/DummyData";

export default function StoryDetailPage() {
  const { id } = useParams();
  //   const [story, setStory] = useState<any>(null);

  //   useEffect(() => {
  //     const fetchStory = async () => {
  //       const { data, error } = await supabase
  //         .from("stories")
  //         .select("*")
  //         .eq("id", id)
  //         .single();

  //       if (error) {
  //         console.error(error);
  //       } else {
  //         setStory(data);
  //       }
  //     };

  //     if (id) fetchStory();
  //   }, [id]);
  const story = stories.find((story) => story.id === id);

  if (!story) return <div>Loading...</div>;

  return <StoryPage story={story} />;
}
