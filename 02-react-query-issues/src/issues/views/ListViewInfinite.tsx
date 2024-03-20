import { useState } from "react";
import { useIssuesInfinite } from "../../hooks/useIssuesInfinite";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { Loader } from "../components/Loader";
import { State } from "../types/issues";

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesDataInfinite } = useIssuesInfinite({ state, labels: selectedLabels });

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  const labelCahnge = (labelName: string) => onLabelChanged(labelName);

  return (
    <div className="mt-5 row">
      <div className="col-8">
        {issuesDataInfinite.isLoading ? (
          <Loader />
        ) : (
          <IssueList
            issuesData={issuesDataInfinite.data?.pages.flat() || []}
            state={state}
            onStateChanged={(newState) => setState(newState)}
          />
        )}

        <button
          className="btn btn-outline-primary mt-2"
          disabled={!issuesDataInfinite.hasNextPage}
          onClick={() => issuesDataInfinite.fetchNextPage()}
        >
          Load more...
        </button>
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={labelCahnge} />
      </div>
    </div>
  );
};
