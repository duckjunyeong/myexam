import React from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useGetTimeTypeCategory = () => {
  const { data: userData } = useSWR("/api/user", fetcher);

  const { data, error, mutate } = useSWR(
    userData && userData.id ? `/api/timeTypeCategory/${userData.id}` : null,
    fetcher
  );

  return { data, error, mutate };
};

export default useGetTimeTypeCategory;
