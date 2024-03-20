import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { githubApi } from "../api/githubApi";
import { sleep } from "../helpers/sleep";
import { Issue, State } from "../issues/types/issues";

type Props = {
  labels: string[];
  state?: State;
  page?: number;
};

const getIssuesData = async ({ labels, state, page = 1 }: Props): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();
  if (labels.length > 0) {
    const labelString = labels.join(",");
    params.append("labels", labelString);
  }

  if (state) params.append("state", state);
  params.append("page", page?.toString());
  params.append("per_page", "3");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  const issuesData = useQuery({
    queryKey: ["issues", { labels, state, page }],
    queryFn: () => getIssuesData({ labels, state, page }),
  });

  const nextPage = () => {
    if (issuesData.data?.length === 0) return;
    setPage(page + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    issuesData,
    page: issuesData.isFetching ? "Loading..." : page,
    prevPage,
    nextPage,
  };
};
