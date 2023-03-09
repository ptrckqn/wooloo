import React from 'react'

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  big?: boolean
  small?: boolean
}

export const Input = ({ value, onChange, placeholder, big, small }: InputProps) => {
  let size = "h-8"
  let padding = "p-6"

  if (big) {
    size = "h-14"
  }

  if (small) {
    size = "h-4"
    padding = "p-4"
  }

  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`w-full rounded-full bg-slate-200 text-lg ${size} ${padding}`}
    />
  )
}
