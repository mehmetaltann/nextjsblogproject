import useSWR from "swr";
import axios from "axios";

const fetcher = async () => {
  const response = await axios.get("/api/posts");
  return response.data.posts;
};

export const usePosts = () => {
  const { data, error, isLoading } = useSWR("/api/posts", fetcher);

  return {
    allPosts: data,
    isLoading,
    error,
  };
};
