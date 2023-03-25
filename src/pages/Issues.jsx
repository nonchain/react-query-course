import { useEffect, useState } from "react";
import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
export default function Issues() {
  const [selectedLabels, setSelectedLabels] = useState([]);

  const onSelectLabelHandler = (label) => {
    setSelectedLabels((prevLabels) =>
      prevLabels.includes(label)
        ? prevLabels.filter((currentLabel) => currentLabel !== label)
        : prevLabels.concat(label)
    );
  };

  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList labels={selectedLabels}/>
        </section>
        <aside>
          <LabelList selectedLabels={selectedLabels} onSelectLabels={onSelectLabelHandler} />
        </aside>
      </main>
    </div>
  );
}
