import { FC, useEffect, useRef, useState } from 'react'

import { useField } from '@unform/core'

export interface SwitchInputProps {
  name: string
  label: string
}

const SwitchInput: FC<SwitchInputProps> = props => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, registerField, error, clearError } =
    useField(props.name)

  const [isSelected, setIsSelected] = useState(!!defaultValue)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = undefined
      }
    })
  }, [fieldName, registerField])

  useEffect(() => {
    if (!inputRef.current) return

    inputRef.current.value = defaultValue
  }, [defaultValue])

  const onChange = () => {
    setIsSelected(!isSelected)
  }

  return (
    <div className="flex items-center gap-x-4">
      <span className="text-xl font-semibold font-poppins text-title">
        {props.label}
      </span>

      <div
        ref={inputRef}
        className="w-12 h-12 cursor-pointer bg-input rounded-2xl"
        onClick={onChange}
      >
        {isSelected && (
          <div className="flex items-center justify-center w-full h-full pointer-events-none select-none bg-gradient rounded-2xl">
            <img src="images/check.svg" alt="checked" />
          </div>
        )}
      </div>

      <span className="">{error}</span>
    </div>
  )
}

export default SwitchInput
