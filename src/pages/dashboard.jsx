import React, { Component } from "react";
import { getTopUsers, getAnalytics } from "../../services/api";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const {
    data: topUsersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["top-users"],
    queryFn: () => getTopUsers(),
    staleTime: 1000 * 60 * 5,
  });

  const { data: analyticalData } = useQuery({
    queryKey: ["analytical-data"],
    queryFn: () => getAnalytics(),
    staleTime: 1000 * 60 * 5,
  });

  console.log({ topUsersData, analyticalData });
  if (isLoading) return <h3>Loading Data</h3>;
  else if (isError) return <h3>No Data Found</h3>;
  return <h1 className="text-cyan-300">Dashboard</h1>;
}
