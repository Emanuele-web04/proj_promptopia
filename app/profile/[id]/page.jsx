"use client";
import Profile from "@/components/Profile";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
const CreatorProfile = ({ params }) => {
  const [creatorPosts, setCreatorPosts] = useState([]);

  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const fetchCreatorPosts = async () => {
    const response = await fetch(`/api/users/${params?.id}/posts`);
    const data = await response.json();
    setCreatorPosts(data);
  };

  useEffect(() => {
    if (params?.id) fetchCreatorPosts();
  }, [params.id]);

  return (
    <Profile
      name={`${name}'s`}
      desc={`Welcome to ${name} profile, here you can see and copy all the prompts that you need.`}
      data={creatorPosts}
    />
  );
};

export default CreatorProfile;
