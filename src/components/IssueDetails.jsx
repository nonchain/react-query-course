import { useParams } from "react-router-dom";
import { useIssueData } from "../helpers/useIssueData";
import IssueHeader from "./IssueHeader";
import { useIssueComments } from "../helpers/useIssueComments";
import Comment from "./Comment";

export default function IssueDetails() {
  const { number } = useParams();
  const issueDetailsQuery = useIssueData(number);
  const commentsQuery = useIssueComments(number);

  return <div className="issue-details">
    {issueDetailsQuery.isLoading ? <p>Loading...</p> : <>
      <IssueHeader {...issueDetailsQuery?.data}/>

      <main>
        <section>
          {
            commentsQuery.isLoading ? <p>Loading...</p> :
            commentsQuery?.data?.map(comment => <Comment key={comment?.id} {...comment}/>)
          }
        </section>
        <aside></aside>
      </main>
    </>}
  </div>;
}
