import React, {useState} from "react"

import { Input } from "components/Input"

export const HomePage = () => {
  const [searchVal, setSearchVal] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value)
  }

  return (
    <section className="p-4">
      <h3 className="text-2xl font-semibold text-center mt-32 mb-12">Search for a movie or show</h3>
      <Input 
        value={searchVal}
        onChange={handleChange}
        placeholder="Last Of Us..."
        big
      />
    </section>
  )
}