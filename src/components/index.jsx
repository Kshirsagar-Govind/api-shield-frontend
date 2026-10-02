import React from "react";

export let TopUsers = ({ loading, data }) => {
  if (loading) return <h3>Data loading</h3>;
  if (!data) return <h3>No Data Found</h3>;
  return (
    <React.Fragment>
      <ul>
        {data.map(([key, value], index) => (
          <li key={key} className="flex justify-between">
            {index + 1}. {key} → {value}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export let UserAnalytics = ({ loading, data }) => {
  if (loading) return <h3>Data loading</h3>;

  if (!data || !Object.entries(data).length) return <h3>No Data Found</h3>;
  return (
    <React.Fragment>
      <ul>
        {Object.entries(data).map(([username, count]) => {
          if (count == -1)
            return (
              <li key={username} className="flex justify-between">
                <span>No user found</span>
              </li>
            );
          return (
            <li key={username} className="flex justify-between">
              <span>{username}</span>
              <span>{count}</span>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export let UserPlans = ({ loading, data }) => {
  if (loading) return <h3>Data loading</h3>;
  if (!data || !Object.entries(data).length) return <h3>No Data Found</h3>;

  return (
    <React.Fragment>
      {data.map((item, index) => {
        return (
          <li key={index} className="flex justify-between items-center mb-2">
            <div className="align-middle">
              <span
                className={`px-1 mr-2 py-0.5 rounded text-xs ${
                    item.plan === "pro"
                    ? "bg-yellow-500 text-black"
                    : item.plan === "standard"
                    ? "bg-blue-500"
                    : "bg-gray-500"
                }`}
                >
                {(item.plan||'basic').toUpperCase()}
              </span>
                  <span className="text-gray-100" >{item.user}</span>
            </div>
            <span>{item.usage} calls</span>
          </li>
        );
      })}
    </React.Fragment>
  );
};
