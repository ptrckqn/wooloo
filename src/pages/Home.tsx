import React, { useState } from 'react'
import { CgSearch } from 'react-icons/cg'

import { Input } from 'components/Input'
import { MovieResult } from 'components/MovieResult'
import { useOmdbApi } from 'hooks/useOmdbApi'

export const HomePage = () => {
  const [searchVal, setSearchVal] = useState<string>('')
  const {omdbRes, searchOmdb} = useOmdbApi()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    searchOmdb(searchVal)
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
        omdbRes && <div>
          {omdbRes.map((movie) => <MovieResult key={movie.imdbID} {...movie}/>)}
        </div>
      }
    </section>
  )
}
