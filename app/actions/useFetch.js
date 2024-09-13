"use client";
import useSWR from "swr";
import * as api from "./fetchActions";

export const useFetch = () => {
  return {
    GetCategories: () =>
      useSWR("api/category", async () => {
        const response = await api.getCategories();
        return response;
      }),
    GetSimilarPosts: (id) =>
      useSWR("api/similarpost", async () => {
        const response = await api.getSimilarPosts(id);

        return response;
      }),
  };
};
