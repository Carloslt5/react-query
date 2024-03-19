import { useState } from "react";
import { useIssues } from "../../hooks/useIssues";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesData } = useIssues();

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  const labelCahnge = (labelName: string) => onLabelChanged(labelName);

  return (
    <div className="row mt-5">
      <div className="col-8">
        <IssueList issuesData={issuesData.data || []} />
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={labelCahnge} />
      </div>
    </div>
  );
};
