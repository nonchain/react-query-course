import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import IssueItem from "./IssueItem";
import { useState } from "react";
import { fetchWithError } from "../helpers/fetchWithError";

export default function IssuesList({ labels, status }) {
  const [searchValue, setSearchValue] = useState("");

  const issuesQuery = useQuery(["issues", { labels, status }], () => {
    const labelsQueryString = labels
      ?.map((label) => `labels[]=${label}`)
      .join("&");
    return fetchWithError(`/api/issues?${labelsQueryString}&status=${status}`)
  });
  const searchQuery = useQuery(
    ["issues", "search", searchValue],
    () =>
      fetch(`/api/search/issues?q=${searchValue}`).then((res) => res.json()),
    {
      enabled: searchValue.length > 0,
      staleTime: Infinity,
    }
  );

  return (
    <div>
      {issuesQuery.isError && <p>{issuesQuery.error.message}</p>}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearchValue(event.target.elements.search.value);
        }}
      >
        <label htmlFor="search">Search issue</label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          onChange={(event) => {
            if (event.target.value.length === 0) {
              setSearchValue("");
            }
          }}
        />
      </form>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : searchQuery.fetchStatus === "idle" && searchQuery.isLoading ? (
        <>
          <h2>Issues List</h2>
          <ul className="issues-list">
            {issuesQuery.data?.map((issue) => (
              <IssueItem key={issue?.id} issue={issue} />
            ))}
          </ul>
        </>
      ) : searchQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Search Result</h2>
          <span>{searchQuery.data.count} Results</span>
          <ul className="issues-list">
            {searchQuery.data?.items?.map((issue) => (
              <IssueItem key={issue?.id} issue={issue} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
