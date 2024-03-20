import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { sleep } from "../helpers/sleep";
import { Issue, State } from "../issues/types/issues";

type Props = {
  state?: State;
  labels: string[];
};

const getIssuesData = async ({ labels, state }: Props): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }
  params.append("pages", "1");
  params.append("per_page", "5");
  const { data } = await githubApi.get<Issue[]>("/issues", { params });

  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const issuesData = useQuery({
    queryKey: ["issues", { state, labels }],
    queryFn: () => getIssuesData({ labels, state }),
  });

  return {
    issuesData,
  };
};
