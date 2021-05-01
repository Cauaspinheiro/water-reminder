import React from 'react'

export interface LinearProgressIndicatorProps {
  percent: number
}

const LinearProgressIndicator: React.FC<LinearProgressIndicatorProps> = props => {
  return (
    <div
      style={{ width: 300, background: '#3e4e62' }}
      className="h-6 rounded-2xl"
    >
      <div
        className="h-full rounded-2xl bg-gradient"
        style={{ width: `${props.percent}%` }}
      />
    </div>
  )
}

export default LinearProgressIndicator
