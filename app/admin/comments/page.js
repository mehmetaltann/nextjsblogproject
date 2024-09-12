"use client";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000//api/category",
    fetcher
  );
  console.log(data);
  return <div>data</div>;
}
