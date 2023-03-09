import React from 'react'
import { Link } from 'react-router-dom'

import { CgFilm, CgGames, CgPlayButtonO, CgTv } from 'react-icons/cg'

export interface MovieResultType {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

export const MovieResult = ({ Poster, Title, Type, Year, imdbID }: MovieResultType) => {
  const renderType = (type: string) => {
    switch (type) {
      case 'series':
        return <CgTv size={300} />
      case 'movie':
        return <CgFilm size={300} />
      case 'game':
        return <CgGames size={300} />
      default:
        return <CgPlayButtonO size={300} />
    }
  }

  return (
    <Link to={imdbID}>
      <div className='relative my-2 h-60 overflow-hidden rounded bg-slate-300 p-3 shadow'>
        <div className='flex h-full justify-between'>
          <img src={Poster} className='h-full' />
          <div className='mr-auto ml-4 mt-8'>
            <h6 className='text-4xl font-thin'>{Title}</h6>
            <div className=''>({Year})</div>
          </div>
          <span className='absolute right-0 top-1/2 -translate-y-2/4 translate-x-1/4	text-slate-400 opacity-30'>
            {renderType(Type)}
          </span>
        </div>
      </div>
    </Link>
  )
}
