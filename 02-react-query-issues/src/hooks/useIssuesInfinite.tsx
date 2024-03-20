import { useInfiniteQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { sleep } from "../helpers";
import { Issue, State } from "../issues/types/issues";

type useIssuesInfiniteProps = {
  labels: string[];
  state?: State;
  page?: number;
};

type queryProps = {
  pageParam?: number;
  queryKey: (string | useIssuesInfiniteProps)[];
};

const getIssuesDataInfinite = async ({ pageParam = 1, queryKey }: queryProps): Promise<Issue[]> => {
  const [, , args] = queryKey;
  const { state, labels } = args as useIssuesInfiniteProps;

  await sleep(2);

  const params = new URLSearchParams();
  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  if (state) params.append("state", state);
  params.append("page", pageParam.toString());
  params.append("per_page", "3");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssuesInfinite = ({ labels, state }: useIssuesInfiniteProps) => {
  const issuesDataInfinite = useInfiniteQuery({
    queryKey: ["issues", "infinite", { labels, state }],
    queryFn: (data) => getIssuesDataInfinite(data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return;
      return pages.length + 1;
    },
  });

  return {
    issuesDataInfinite,
  };
};
