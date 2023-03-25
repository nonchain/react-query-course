import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import IssueItem from "./IssueItem";

export default function IssuesList({ labels }) {
  const issuesQuery = useQuery(["issues", labels], () =>
    {
      const labelsQueryString = labels?.map(label => `labels[]=${label}`).join("&");
      return fetch(`/api/issues?${labelsQueryString}`).then((res) => res.json())
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
