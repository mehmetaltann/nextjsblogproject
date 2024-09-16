import useSWR, { mutate } from "swr";
import axios from "axios";

const fetcher = async () => {
  const response = await axios.get("/api/category");
  return response.data.categories;
};

export const useCategory = () => {
  const { data, error, isLoading } = useSWR("/api/category", fetcher);

  const deleteCategory = async (mongoId) => {
    await axios.delete(`/api/category`, {
      params: {
        id: mongoId,
      },
    }),
      mutate("/api/category");
  };

  const addCategory = async (formData) => {
    const newData = {
      name: formData.get("catName"),
      color: formData.get("catColor"),
    };
    await axios.post("/api/category", newData);
    mutate("/api/category");
  };

  return {
    categories: data,
    isLoading,
    isError: error,
    deleteCategory,
    addCategory,
  };
};

