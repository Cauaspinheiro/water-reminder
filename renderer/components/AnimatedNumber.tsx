import React, { JSXElementConstructor, useEffect, useRef } from 'react'

import { useMotionValue, animate, AnimationControls } from 'framer-motion'

export interface AnimatedNumberProps {
  children: JSXElementConstructor<{ ref: React.RefObject<any> }>
  componentProps?: Record<string, unknown>
  to: number
  initialValue: number
  animationConfig?: AnimationControls
  textPattern: string
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = props => {
  const x = useMotionValue(props.initialValue)

  const ref = useRef<{ textContent: string }>(null)

  useEffect(() => {
    const controls = animate(x, props.to, {
      type: 'spring',
      bounce: 0,
      duration: 1.5,
      ...props.animationConfig,
      onUpdate(value) {
        if (!ref.current) return

        ref.current.textContent = props.textPattern.replaceAll(
          '{number}',
          value.toFixed(0)
        )
      }
    })

    return controls.stop
  }, [props.animationConfig, props.textPattern, props.to, x])

  return <props.children ref={ref} {...props.componentProps} />
}

export default AnimatedNumber
