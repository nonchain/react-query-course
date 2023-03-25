import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import IssueItem from "./IssueItem";

export default function IssuesList({ labels, status }) {
  console.log(status);
  const issuesQuery = useQuery(["issues", {labels, status}], () =>
    {
      const labelsQueryString = labels?.map(label => `labels[]=${label}`).join("&");
      return fetch(`/api/issues?${labelsQueryString}&status=${status}`).then((res) => res.json())
    }
  );

  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {issuesQuery.data?.map((issue) => (
            <IssueItem key={issue?.id} issue={issue}/>
          ))}
        </ul>
      )}
    </div>
  );
}
