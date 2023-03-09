import React, { useState } from 'react'
import { CgSearch } from 'react-icons/cg'

import { Input } from 'components/Input'
import { MovieResultType, MovieResult } from 'components/MovieResult'

export const HomePage = () => {
  const [searchVal, setSearchVal] = useState<string>('')
  const [foundMovies, setFoundMoives] = useState<MovieResultType[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const omdb_api = new URL("http://www.omdbapi.com/")
    omdb_api.searchParams.set("apikey", process.env.REACT_APP_OMDB_API_KEY as string)
    omdb_api.searchParams.set("s", searchVal)

    const res = await fetch(omdb_api)
    if (res.ok) {
      const data = await res.json()
      setFoundMoives(data.Search)
    }
  }

  return (
    <section className='p-4'>
      <h3 className='mt-32 mb-12 text-center text-2xl font-semibold'>Search for a movie or show</h3>
      <div className='relative mb-10'>
        <form onSubmit={handleSearch}>
          <Input value={searchVal} onChange={handleChange} placeholder='The Last Of Us...' big />
          <button type='submit'>
            <CgSearch size='30' className={`${searchVal ? 'text-slate-800' : 'text-slate-400'} absolute right-5 top-3.5`} />
          </button>
        </form>
      </div>
      {
        foundMovies && <div>
          {foundMovies.map((movie) => <MovieResult key={movie.imdbID} {...movie}/>)}
        </div>
      }
    </section>
  )
}
