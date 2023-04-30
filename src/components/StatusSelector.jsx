import React from 'react'

const possibleStatus = [
  {id: "backlog", label: "Backlog"},
  {id: "todo", label: "To-Do"},
  {id: "inProgress", label: "In Progress"},
  {id: "done", label: "Done"},
  {id: "cancelled", label: "Cancelled"},
]

function StatusSelector({ value, onChange, title }) {
  return (
    <select name="status" id="issues-status" className='status-select' value={value} onChange={onChange}>
      {title ? <option value="">{title}</option> : null}
      {
        possibleStatus.map(option => <option key={option.id} value={option.id}>{option.label}</option>)
      }
    </select>
  )
}

export default StatusSelector