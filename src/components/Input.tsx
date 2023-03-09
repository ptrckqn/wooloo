import React from 'react'

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  big?: boolean
}

export const Input = ({ value, onChange, placeholder, big }: InputProps) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`w-full rounded-full bg-slate-200 p-6 text-lg ${big ? 'h-14' : 'h-8'}`}
    />
  )
}
