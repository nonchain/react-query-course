import { useLabelsData } from "../helpers/useLabelsData";

export default function LabelList({ onSelectLabels, selectedLabels }) {
  const labelsQuery = useLabelsData();
  return (
    <div className="labels">
      <h3>Labels</h3>
      {labelsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {labelsQuery?.data?.map((label) => (
            <li key={label.id}>
              <button
                onClick={() => onSelectLabels(label.id)}
                className={`label ${label.color} ${
                  selectedLabels.includes(label.id) ? "selected" : ""
                }`}
              >
                {label.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
