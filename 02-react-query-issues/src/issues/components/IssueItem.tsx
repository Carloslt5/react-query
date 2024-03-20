import { useQueryClient } from "@tanstack/react-query";
import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Issue, State } from "../types/issues";

type IssueItemProps = {
  issue: Issue;
};

export const IssueItem = ({ issue }: IssueItemProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/issues/issue/${issue.number}`);
  };

  const queryClient = useQueryClient();

  // const prefetchData = () => {
  //   queryClient.prefetchQuery({
  //     queryKey: ["issue", issue.number],
  //     queryFn: () => getIssueData(issue.number),
  //   });

  //   queryClient.prefetchQuery({
  //     queryKey: ["issue", issue.number, "comments"],
  //     queryFn: () => getIssueComments(issue.number),
  //   });
  // };

  const preSetData = () => {
    queryClient.setQueryData(["issue", issue.number], issue);
  };

  return (
    <div
      className="mb-2 card issue"
      onClick={handleNavigate}
      // onMouseEnter={prefetchData}
      onMouseEnter={preSetData}
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}
        <div className="px-2 d-flex flex-column flex-fill">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            #{issue.number} opened 2 days ago by <span className="fw-bold">{issue.user.login}</span>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img src={issue.user.avatar_url} alt={issue.user.avatar_url} className="avatar" />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
