import React from 'react'
import StatusSelector from './StatusSelector'

function IssueStatus() {
  return (
    <div className='issue-options'>
      <div>
        <span>Status</span>
        <StatusSelector />
      </div>
    </div>
  )
}

export default IssueStatus