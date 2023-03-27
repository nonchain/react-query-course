import { useParams } from "react-router-dom";
import { useIssueData } from "../helpers/useIssueData";

export default function IssueDetails() {
  const { number } = useParams();
  const issueDetailsQuery = useIssueData(number);

  return <div className="issue-details">
    
  </div>;
}
