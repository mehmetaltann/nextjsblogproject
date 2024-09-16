import useSWR from "swr";
import axios from "axios";

const fetcher = async () => {
  const response = await axios.get("/api/blog");
  return response.data.blogs;
};

export const usePosts = () => {
  const { data, error, isLoading } = useSWR("/api/blog", fetcher);

  const deletePost = async (mongoId) => {
    await axios.delete(`/api/blog`, {
      params: {
        id: mongoId,
      },
    }),
      mutate("/api/blog");
  };

  return {
    blogs: data,
    isLoading,
    error,
    deletePost,
  };
};
