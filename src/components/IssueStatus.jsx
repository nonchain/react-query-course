import React from "react";
import StatusSelector from "./StatusSelector";
import { useMutation, useQueryClient } from "react-query";

function IssueStatus({ status, issueNumber }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (status) =>
      fetch(`/api/issues/${issueNumber}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status }),
      }).then((res) => res.json()),
    {
      onMutate: (status) => {
        const oldIssueStatus = queryClient.getQueriesData([
          "issue",
          issueNumber,
        ]).status;
        queryClient.setQueryData(["issue", issueNumber], (data) => ({
          // data: current value in the cash
          ...data,
          status,
        }));

        // If the request failed, We rollback the optimistic update to the previous situation
        return function rollback() {
          queryClient.setQueryData(["issue", issueNumber], (data) => ({
            ...data,
            status: oldIssueStatus,
          }));
        };
      },
      onError: (error, variables, rollback) => { //  Get three parameters
        rollback(); // Just need this for now, It's same as the rollback function in the onMutate
      },
      onSettled: () => {
        queryClient.invalidateQueries(["issue", issueNumber], { exact: true });
      },
    }
  );
  return (
    <div className="issue-options">
      <div>
        <span>Status</span>
        <StatusSelector
          value={status}
          onChange={(event) => mutate(event?.target?.value)}
        />
      </div>
    </div>
  );
}

export default IssueStatus;
