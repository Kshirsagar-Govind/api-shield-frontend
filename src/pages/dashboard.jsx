import React, { Component } from "react";
import { getTopUsers, getAnalytics, getUserPlans } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { TopUsers, UserAnalytics, UserPlans } from "../components";

export default function Dashboard() {
  let [apiKey, setApiKey] = React.useState("");
  const [debouncedKey, setDebouncedKey] = React.useState(apiKey);
  const {
    data: topUsersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["top-users"],
    queryFn: () => getTopUsers(),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: analyticalData,
    isLoading: analyticalDataLoading,
  } = useQuery({
    queryKey: ["analytical-data", debouncedKey],
    queryFn: () => getAnalytics(debouncedKey),
    staleTime: 1000 * 60 * 5,
    // enabled: !!debouncedKey,
  });

  const { data: userPlans, isLoading: userPlansDataLoading } = useQuery({
    queryKey: ["user-plans"],
    queryFn: () => getUserPlans(),
    staleTime: 1000 * 60 * 5,
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKey(apiKey);
    }, 500);

    return () => clearTimeout(timer);
  }, [apiKey]);

  if (isLoading) return <h3>Loading Data</h3>;
  else if (isError) return <h3>No Data Found</h3>;
  return (
    <React.Fragment>
      <h1 className="text-cyan-300">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between align-middle mb-4">
            <h2 className="text-xl font-bold mb-2 text-cyan-300 text-left">
              Top Users
            </h2>
          </div>
          <TopUsers loading={isLoading} data={topUsersData?.data} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between align-middle mb-4">
            <h2 className="text-xl font-bold mb-2 text-cyan-300 text-left">
              User Analytics
            </h2>
            <input
              onChange={(e) => setApiKey(e.target.value)}
              value={apiKey}
              type="text"
              placeholder="Search analytics"
              className="rounded-sm bg-gray-900 text-white placeholder:text-gray-400 border-none focus:outline-none focus:none px-2"
            />
          </div>
          <UserAnalytics
            loading={analyticalDataLoading}
            data={analyticalData?.data}
          />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between align-middle mb-4">
            <h2 className="text-xl font-bold mb-2 text-cyan-300 text-left">
              User Plans
            </h2>
          </div>
          <UserPlans loading={userPlansDataLoading} data={userPlans?.data} />
        </div>
      </div>
    </React.Fragment>
  );
}
