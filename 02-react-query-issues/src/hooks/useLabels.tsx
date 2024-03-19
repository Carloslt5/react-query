import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { sleep } from "../helpers/sleep";
import { Labels } from "../issues/types/labels";

const getLabels = async (): Promise<Labels[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Labels[]>("/labels");
  console.log("🚀 --------- data", data);
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    // placeholderData:[]
    // initialData:[]
  });

  return { labelsQuery };
};
