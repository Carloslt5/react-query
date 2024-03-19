import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { Issues } from "../issues/types/issues";

const getIssuesData = async (): Promise<Issues[]> => {
  const { data } = await githubApi.get<Issues[]>("/issues");
  // console.log("🚀 --------- data", data);
  return data;
};

export const useIssues = () => {
  const issuesData = useQuery({
    queryKey: ["issues"],
    queryFn: getIssuesData,
  });

  return {
    issuesData,
  };
};
