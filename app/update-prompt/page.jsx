"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Form from "@/components/Form";
const EditPrompt = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const getPromptDetails = async () => {
    const response = await fetch(`api/prompt/${promptId}`);
    const data = await response.json();

    setPost({
      prompt: data.prompt,
      tag: data.tag,
    });

    console.log(`${post.prompt} - ${post.tag}`);
  };

  useEffect(() => {
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert("Prompt ID couldn't be found")

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push("/profile")
      }

    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSumbit={updatePrompt}
    />
  );
};

export default EditPrompt;
