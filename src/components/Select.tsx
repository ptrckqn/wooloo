import React from "react"

interface SelectProps {
  value: string;
  options: {
    value: string;
    label?: string;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
}

export const Select = ({ value, options, onChange }: SelectProps) => {
  return (
    <select value={value} onChange={onChange} className="bg-slate-200 rounded-full text-lg h-8 pl-2 w-52" >
      {options.map((o) => (
        <option value={o.value} key={o.value}>{o.label || o.value}</option>
      ))}
    </select>
  )
}