import ReactMarkdown from "react-markdown";
import { Issue } from "../types/issues";

interface IssueCommentProps {
  issueData: Issue;
}

export const IssueComment = ({ issueData }: IssueCommentProps) => {
  return (
    <div className="col-12">
      <div className="mt-2 border-white card">
        <div className="card-header bg-dark">
          <img src={issueData.user.avatar_url} alt={issueData.user.avatar_url} className="avatar" />
          <span className="mx-2">{issueData.user.login} commented</span>
        </div>
        <div className="card-body text-dark">
          <ReactMarkdown>{issueData.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
