export default function AddIssue() {
  return <div className="add-issue">
    <h2>Add Issue</h2>

    <form>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" placeholder="Title"/>

      <label htmlFor="comment"></label>
      <textarea id="comment" name="comment" placeholder="Comment"/>

      <button type="submit" disabled={false}>Add Issue</button>
    </form>
  </div>;
}
