import React from "react";
import useAxios from "axios-hooks";

interface UseStatistics {
  loading: boolean;
  data: any;
  error: any;
}

function useStatistics(): UseStatistics {
  const [{ loading, data, error }] = useAxios<any[]>("/admin/survey");
  return {
    loading,
    data,
    error,
  };
}

function StatisticsPage(): React.ReactElement {
  const { loading, data, error } = useStatistics();
  return <div />;
}

export default StatisticsPage;
