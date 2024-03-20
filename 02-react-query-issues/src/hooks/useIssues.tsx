import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { Issue } from "../issues/types/issues";

const getIssuesData = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>("/issues");
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
