import React from "react";
import { GoIssueOpened, GoIssueClosed } from "react-icons/go";
import { possibleStatus } from '../helpers/defaultData';

function IssueHeader({
  title,
  number,
  status = "todo",
  createdBy,
  createdDate,
  comments,
}) {
  const statusObj = possibleStatus.find(pStatus => pStatus.id === status);

  return (
    <header>
      <h2>
        {title} <span># {number}</span>
      </h2>
      <div>
        <span
          className={
            status === "done" || status === "cancelled" ? "closed" : "open"
          }
        >
          {status === "done" || status === "cancelled" ? (
            <GoIssueClosed />
          ) : (
            <GoIssueOpened />
          )}
          {statusObj?.label}
        </span>
      </div>
    </header>
  );
}

export default IssueHeader;
