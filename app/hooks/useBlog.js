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

  return {
    data,
    isLoading,
    error,
  };
};
