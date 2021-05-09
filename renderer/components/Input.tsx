import React, { DetailedHTMLProps } from 'react'

type InputElementProps = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export interface InputProps extends InputElementProps {
  label: string
  name: string
  onChangeText(value: string | number): void
  value: string | number
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  onChangeText,
  value,
  ...inputProps
}) => {
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
        id={name}
        value={value}
        onChange={e => onChangeText(e.target.value)}
        className="w-full h-16 pl-5 text-lg placeholder-gray-200 border-2 outline-none text-title rounded-xl border-input bg-input focus:border-primary"
      />
    </div>
  )
}

export default Input
