"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");

  const { data: session } = useSession() 
  const pathName = usePathname()
  const router = useRouter()

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("")
    }, 3000);
  }

  const navigateToUserProfile = () => {
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-start items-start flex-1 gap-3 cursor-pointer" onClick={navigateToUserProfile}>
        <Image
          src={post.creator.image}
          alt="user_image"
          height={40}
          width={40}
          className="rounded-full object-contain"
        />
        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {post.creator.username}
          </h3>
          <p className="font-inter text-[12px] text-gray-500">
            {post.creator.email}
          </p>
        </div>

        
      </div>

      <p className="my-4 font-satoshi text-gray-700 text-sm">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
      >
        {post.tag}
      </p>
      <div className="mt-5 justify-between flex flex-row-reverse border-t border-t-gray-200 pt-3">
      <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
       <div className="flex flex-row gap-6">
          <p className="font-inter green_gradient text-sm cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter orange_gradient text-sm cursor-pointer" onClick={handleDelete}>Delete</p>
          </div>
      )}
       </div>
    </div>
  );
};

export default PromptCard;
