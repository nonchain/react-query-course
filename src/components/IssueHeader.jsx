import React from "react";
import { GoIssueOpened, GoIssueClosed } from "react-icons/go";
import { possibleStatus } from '../helpers/defaultData';
import { useUserData } from "../helpers/useUserData";
import { relativeDate } from "../helpers/relativeDate";

function IssueHeader({
  title,
  number,
  status = "todo",
  createdBy,
  createdDate,
  comments,
}) {
  const createdUserData = useUserData(createdBy);
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
        <span className="created-by">
          {createdUserData.isLoading ? "..." : createdUserData?.data?.name} 
        </span>{" "}
        opened this issue {relativeDate(createdDate)}
      </div>
    </header>
  );
}

export default IssueHeader;
