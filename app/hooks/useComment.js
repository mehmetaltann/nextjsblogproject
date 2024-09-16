import useSWR, { mutate } from "swr";
import axios from "axios";

export const useComment = (blogId) => {
  const { data, error, isLoading } = useSWR("/api/comment", async () => {
    const response = await axios.get("/api/comment", {
      params: { id: blogId },
    });
    return response.data;
  });

  const addComment = async (postData) => {
    const response = await axios.post("/api/comment", postData);
    mutate("/api/comment");
    return {
      isSuccess: response.data.success,
      resMessage: response.data.msg,
    };
  };

  const deleteComment = async (commentId) => {
    const response = await axios.delete("/api/comment", {
      params: {
        id: commentId,
      },
    });
    mutate("/api/comment");
    return {
      isSuccess: response.data.success,
      resMessage: response.data.msg,
    };
  };

  const updateComment = async (updateData) => {
    const response = await axios.put("/api/comment", updateData);
    mutate("/api/comment");
    return {
      isSuccess: response.data.success,
      resMessage: response.data.msg,
    };
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
