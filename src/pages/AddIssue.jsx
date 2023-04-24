import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function AddIssue() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addIssue = useMutation((body) => {
    return fetch("/api/issues", {
      method: "POST", 
      headers: {"content-type": "application/json"},
      body: JSON.stringify(body)
    }).then(res => res.json());
  }, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["issues"], { exact: true });
      queryClient.setQueryData(["issues", data?.number?.toString()], data);
      navigate(`/issue/${data?.number}`);
    }
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if(addIssue.isLoading) return;

    addIssue.mutate({
      comment: event?.target?.comment?.value,
      title: event?.target?.title?.value
    })
  }

  return <div className="add-issue">
    <h2>Add Issue</h2>

    <form onSubmit={onSubmitHandler}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" placeholder="Title"/>

      <label htmlFor="comment"></label>
      <textarea id="comment" name="comment" placeholder="Comment"/>

      <button type="submit" disabled={addIssue.isLoading}>
        {
          addIssue.isLoading ? "Adding Issue..." : "Add Issue"
        }
      </button>
    </form>
  </div>;
}
