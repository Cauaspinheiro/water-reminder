import React, { DetailedHTMLProps, useEffect, useRef } from 'react'

import { useField } from '@unform/core'

import styles from '../styles/components/input.module.css'

type InputElementProps = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export interface InputProps extends InputElementProps {
  label: string
  name: string
}

const Input: React.FC<InputProps> = ({ label, name, ...inputProps }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, registerField, error, clearError } =
    useField(name)

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

  return (
    <div className="flex flex-col justify-between w-full gap-y-5">
      <label
        className="text-xl font-semibold font-poppins text-title"
        htmlFor={name}
      >
        {label}
      </label>

      <input
        {...inputProps}
        name={name}
        ref={inputRef}
        id={name}
        onFocus={clearError}
        className={`${error ? styles.invalid : undefined} ${styles.input}`}
      />

      <span className={styles.error_text}>{error}</span>
    </div>
  )
}

export default Input
