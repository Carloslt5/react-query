import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { sleep } from "../helpers/sleep";
import { Issue } from "../issues/types/issues";

const getIssueData = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueData = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssueData(issueNumber),
  });

  const commentData = useQuery({
    queryKey: ["issue", issueNumber, "comments"],
    queryFn: () => getIssueComments(issueData.data!.number),
    enabled: issueData !== undefined,
  });

  return {
    issueData,
    commentData,
  };
};
