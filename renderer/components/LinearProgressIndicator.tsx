import React from 'react'

export interface LinearProgressIndicatorProps {
  percent: number
}

const LinearProgressIndicator: React.FC<LinearProgressIndicatorProps> = props => {
  const percent =
    props.percent > 0 ? (props.percent < 8 ? 8 : props.percent) : 0

  return (
    <div style={{ background: '#3e4e62' }} className="w-full h-6 rounded-2xl">
      <div
        className="h-full max-w-full transition-all duration-1000 rounded-2xl bg-gradient"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export default LinearProgressIndicator
