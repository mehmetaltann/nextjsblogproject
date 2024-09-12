"use client";
import AnimationWrapper from "@/Components/Layouts/AnimationWrapper";
import axios from "axios";
import PostList from "@/Components/Admin/Start/PostList";
import NewPostButton from "@/Components/Admin/Start/NewPostButton";
import { useState, useEffect } from "react";

const page = ({ type }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await axios.get("/api/blog");
    setPosts(response.data.blogs);
  };

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete(`/api/blog`, {
      params: {
        id: mongoId,
      },
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchPosts();
    } else {
      toast.error("İşlem Gerçekleşmedi");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return <div>Deneme</div>;
};

export default page;

/*
 <AnimationWrapper
      keyValue={type}
      className="p-3 md:p-0 md:ms-48 mt-8 mb-8 self-start flex flex-col gap-3 w-2/3"
    >
      <NewPostButton />
      <hr />
      <PostList posts={posts} deleteBlog={deleteBlog} />
    </AnimationWrapper>

*/
