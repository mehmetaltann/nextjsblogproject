import useSWR, { mutate } from "swr";
import axios from "axios";
import { toast } from "react-toastify";

const fetcher = async () => {
  const response = await axios.get("/api/blog");
  return response.data.blogs;
};

export const usePosts = () => {
  const { data, error, isLoading } = useSWR("/api/blog", fetcher);

  const addPost = async (postData) => {
    const response = await axios.post("/api/blog", postData);
    toastHandler(response);
    mutate("/api/blog");
    return { isSuccess: response.data.success };
  };

  const updatePost = async (postData) => {
    const response = await axios.put("/api/blog", postData);
    toastHandler(response);
    mutate("/api/blog");
  };

  const deletePost = async (mongoId) => {
    const response = await axios.delete("/api/blog", {
      params: {
        id: mongoId,
      },
    });
    toastHandler(response);
    mutate("/api/blog");
  };

  const toastHandler = (response) => {
    if (response.data.success) {
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  };

  return {
    blogs: data,
    isLoading,
    error,
    deletePost,
    addPost,
    updatePost,
  };
};
