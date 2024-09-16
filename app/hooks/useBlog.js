import useSWR, { mutate } from "swr";
import axios from "axios";

const fetcher = async () => {
  const response = await axios.get("/api/blog", {
    params: { id: params.id },
  });
  return response.data;
};

export const useBlog = () => {
  const { data, error, isLoading } = useSWR("/api/blog", fetcher);

  const deleteBlog = async (mongoId) => {
    await axios.delete(`/api/blog`, {
      params: {
        id: mongoId,
      },
    }),
      mutate("/api/blog");
  };

  return {
    data,
    isLoading,
    error,
    deleteBlog,
  };
};
