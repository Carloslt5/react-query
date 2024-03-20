import { useState } from "react";
import { useIssues } from "../../hooks/useIssues";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { Loader } from "../components/Loader";
import { State } from "../types/issues";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesData } = useIssues({ state, labels: selectedLabels });

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
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={labelCahnge} />
      </div>
    </div>
  );
};
