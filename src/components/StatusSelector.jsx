import React from 'react'

const possibleStatus = [
  {id: "backlog", label: "Backlog"},
  {id: "todo", label: "To-Do"},
  {id: "inProgress", label: "In Progress"},
  {id: "done", label: "Done"},
  {id: "cancelled", label: "Cancelled"},
]

function StatusSelector({ value, onChange }) {
  return (
    <select name="status" id="issues-status" className='status-select' value={value} onChange={onChange}>
      <option value="">Select a status</option>
      {
        possibleStatus.map(option => <option key={option.id} value={option.id}>{option.label}</option>)
      }
    </select>
  )
}

export default StatusSelector