import { Issue } from "../types/issues";
import { IssueItem } from "./IssueItem";

type IssuesListProps = {
  issuesData: Issue[];
};

export const IssueList = ({ issuesData }: IssuesListProps) => {
  return (
    <div className="border-white card">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a className="nav-link active">All</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Open</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Closed</a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issuesData.map((issue) => (
          <IssueItem key={issue.id} {...issue} />
        ))}
      </div>
    </div>
  );
};
