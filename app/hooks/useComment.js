import useSWR, { mutate } from "swr";
import axios from "axios";
import { toast } from "react-toastify";

export const useComment = (blogId) => {
  const { data, error, isLoading } = useSWR("/api/comment", async () => {
    const response = await axios.get("/api/comment", {
      params: { id: blogId },
    });
    return response.data;
  });

  const addComment = async (postData) => {
    const response = await axios.post("/api/comment", postData);
    toastHandler(response);
    mutate("/api/comment");
  };

  const deleteComment = async (commentId) => {
    const response = await axios.delete("/api/comment", {
      params: {
        id: commentId,
      },
    });
    toastHandler(response);
    mutate("/api/comment");
  };

  const updateComment = async (updateData) => {
    const response = await axios.put("/api/comment", updateData);
    toastHandler(response);
    mutate("/api/comment");
  };

  const toastHandler = (response) => {
    if (response.data.success) {
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  };

  return {
    data,
    isLoading,
    error,
    addComment,
    deleteComment,
    updateComment,
  };
};
