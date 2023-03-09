import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Input } from 'components/Input'
import { useOmdbApi } from 'hooks/useOmdbApi'

export const Movie = () => {
  const { movieId } = useParams()
  const { omdbRes, getById } = useOmdbApi()

  const [seriesInfo, setSeriesInfo] = useState({ season: "", episode: "" })

  useEffect(() => {
    if (movieId) {
      getById(movieId)
    }
  }, [movieId])

  const handleSeriesInfo = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesInfo({
      ...seriesInfo,
      [key]: e.target.value
    })
  }
 
  if (!omdbRes) {
    return null
  }

  const movie = omdbRes[0]

  console.log(movie)
  return (
    <div>
      <h3 className='text-3xl'>
        {movie.Title} <span className='text-base uppercase text-slate-400'>({movie.Type})</span>
      </h3>
      {movie.Type === 'series' && (
        <div>
          <div className='flex items-center'>
            <div>Season: </div>
            <Input
              value={seriesInfo.season}
              onChange={handleSeriesInfo("season")}
            />
          </div>

          <div>Episode: </div>
        </div>
      )}
    </div>
  )
}
