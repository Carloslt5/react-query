import { FiCheckCircle, FiInfo, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Issue, State } from "../types/issues";

export const IssueItem = ({ title, state, user, comments, number }: Issue) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/issues/issue/${number}`);
  };

  return (
    <div className="mb-2 card issue" onClick={handleNavigate}>
      <div className="card-body d-flex align-items-center">
        {state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}
        <div className="px-2 d-flex flex-column flex-fill">
          <span>{title}</span>
          <span className="issue-subinfo">
            #{number} opened 2 days ago by <span className="fw-bold">{user.login}</span>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img src={user.avatar_url} alt={user.avatar_url} className="avatar" />
          <span className="px-2">{comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
