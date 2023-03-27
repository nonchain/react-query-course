import React from "react";
import { GoIssueOpened, GoIssueClosed } from "react-icons/go";

function IssueHeader({
  title,
  number,
  status = "todo",
  createdBy,
  createdDate,
  comments,
}) {
  return (
    <header>
      <h1>
        {title} <span># {number}</span>
      </h1>
      <div>
        <span
          className={
            status === "done" || status === "cancelled" ? "closed" : "open"
          }
        >
          {status === "done" || status === "cancelled" ? (
            <GoIssueClosed style={{ color: "green" }} />
          ) : (
            <GoIssueOpened style={{ color: "red" }} />
          )}
        </span>
      </div>
    </header>
  );
}

export default IssueHeader;
