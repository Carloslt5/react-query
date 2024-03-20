import { useState } from "react";
import { useIssues } from "../../hooks/useIssues";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { Loader } from "../components/Loader";
import { State } from "../types/issues";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesData, page, prevPage, nextPage } = useIssues({ state, labels: selectedLabels });

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  const labelCahnge = (labelName: string) => onLabelChanged(labelName);

  return (
    <div className="mt-5 row">
      <div className="col-8">
        {issuesData.isLoading ? (
          <Loader />
        ) : (
          <IssueList
            issuesData={issuesData.data || []}
            state={state}
            onStateChanged={(newState) => setState(newState)}
          />
        )}

        <div className="mt-2 d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary"
            disabled={issuesData.isFetching}
            onClick={prevPage}
          >
            Prev
          </button>
          <span>{page}</span>
          <button
            className="btn btn-outline-primary"
            disabled={issuesData.isFetching}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={labelCahnge} />
      </div>
    </div>
  );
};
