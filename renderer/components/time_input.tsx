import React, { useEffect, useRef } from 'react'

import { useField } from '@unform/core'

import useIsServer from '../hooks/useIsServer'
import inputStyles from '../styles/components/input.module.css'
import timeInputStyles from '../styles/components/time_input.module.css'

export interface TimeInputProps {
  label: string
  name: string
}

interface HTMLDivElementWithValue extends HTMLDivElement {
  value: string
}

const TimeInput: React.FC<TimeInputProps> = props => {
  const inputRef = useRef<HTMLDivElementWithValue>(null)

  const { fieldName, defaultValue, registerField, error, clearError } =
    useField(props.name)

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
        ref.current.value = ''
      }
    })
  }, [fieldName, registerField])

  useEffect(() => {
    if (!inputRef.current) return

    inputRef.current.value = defaultValue
  }, [defaultValue])

  const isServer = useIsServer()

  const handleChangeValue = (e: any, index: number, id?: string) => {
    if (isServer) return

    if (!e.target.value) return

    if (!inputRef.current?.value) return

    inputRef.current.value = inputRef.current.value
      .split('')
      .map((v, i) => {
        if (i === index) return e.target.value

        return v
      })
      .join('')

    const nextInput = document.querySelector(`#${id}`) as any

    if (!nextInput) return

    nextInput.focus()
    nextInput.select()
  }

  return (
    <div
      ref={inputRef}
      className="flex flex-col justify-end w-full h-full max-w-full gap-y-5"
    >
      <label className="text-xl font-semibold font-poppins text-title">
        {props.label}
      </label>

      <div className="flex items-center gap-x-2 ">
        <input
          id="first-digit"
          maxLength={1}
          defaultValue={defaultValue[0]}
          onInput={e => handleChangeValue(e, 0, 'second-digit')}
          onFocus={clearError}
          className={`${error ? inputStyles.invalid : ''} ${
            inputStyles.input
          } ${timeInputStyles.input}`}
        />
        <input
          id="second-digit"
          maxLength={1}
          onFocus={clearError}
          defaultValue={defaultValue[1]}
          onInput={e => handleChangeValue(e, 1, 'third-digit')}
          className={`${error ? inputStyles.invalid : ''} ${
            inputStyles.input
          } ${timeInputStyles.input}`}
        />
        <span
          className={`${
            error ? 'text-red-500' : 'text-white'
          } text-lg font-semibold  font-poppins`}
        >
          :
        </span>
        <input
          id="third-digit"
          maxLength={1}
          onFocus={clearError}
          defaultValue={defaultValue[3]}
          onInput={e => handleChangeValue(e, 3, 'forty-digit')}
          className={`${error ? inputStyles.invalid : ''} ${
            inputStyles.input
          } ${timeInputStyles.input}`}
        />
        <input
          id="forty-digit"
          maxLength={1}
          onFocus={clearError}
          defaultValue={defaultValue[4]}
          onInput={e => handleChangeValue(e, 4)}
          className={`${error ? inputStyles.invalid : ''} ${
            inputStyles.input
          } ${timeInputStyles.input}`}
        />
      </div>

      <span className={inputStyles.error_text}>{error}</span>
    </div>
  )
}

export default TimeInput
