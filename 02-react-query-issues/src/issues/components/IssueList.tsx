import { Issue, State } from "../types/issues";
import { IssueItem } from "./IssueItem";

type IssuesListProps = {
  issuesData: Issue[];
  state?: State;
  onStateChanged: (newState?: State) => void;
};

export const IssueList = ({ issuesData, state, onStateChanged }: IssuesListProps) => {
  return (
    <div className="border-white card">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a className={`nav-link ${!state ? "active" : ""}`} onClick={() => onStateChanged()}>
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Open ? "active" : ""}`}
              onClick={() => onStateChanged(State.Open)}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${state === State.Close ? "active" : ""}`}
              onClick={() => onStateChanged(State.Close)}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issuesData.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};
