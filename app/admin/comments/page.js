"use client";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const page = () => {
  const { data, error } = useSWR("/api/category", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log("data")

  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
};

export default page;
