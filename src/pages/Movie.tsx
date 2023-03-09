import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Input } from 'components/Input'
import { useOmdbApi, MovieSearchType } from 'hooks/useOmdbApi'

export const Movie = () => {
  const { movieId } = useParams()
  const { omdbRes, getById } = useOmdbApi()

  const [seriesInfo, setSeriesInfo] = useState({ season: '', episode: '' })

  useEffect(() => {
    if (movieId) {
      getById(movieId)
    }
  }, [movieId])

  const handleSeriesInfo = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesInfo({
      ...seriesInfo,
      [key]: e.target.value,
    })
  }

  const renderPlayer = (movie: MovieSearchType) => {
    let vidUrl = `https://vidsrc.me/embed/${movie.imdbID}`
    if (movie.Type === 'series') {
      if (!seriesInfo.season || !seriesInfo.episode) {
        return null
      }
      vidUrl += `/${seriesInfo.season}-${seriesInfo.episode}`
    }

    return (
      <div className='mt-4 overflow-hidden relative h-0' style={{paddingBottom: "56.25%"}}>
        <iframe
          width='853'
          height='480'
          src={vidUrl}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
          allowFullScreen
          title='Embedded youtube'
          className='h-full w-full absolute left-0'
        />
      </div>
    )
  }

  if (!omdbRes) {
    return null
  }

  const movie = omdbRes[0]

  console.log(movie)
  return (
    <div>
      <h3 className='mb-8 text-3xl'>
        {movie.Title} <span className='text-base uppercase text-slate-400'>({movie.Type})</span>
      </h3>
      {movie.Type === 'series' && (
        <div>
          <div className='flex'>
            <div className='flex items-center'>
              <div className='mr-2'>Season: </div>
              <Input value={seriesInfo.season} onChange={handleSeriesInfo('season')} small />
            </div>
            <div className='mx-2 flex items-center'>
              <div className='mr-2'>Episode: </div>
              <Input value={seriesInfo.episode} onChange={handleSeriesInfo('episode')} small />
            </div>
          </div>
        </div>
      )}

      {movie && renderPlayer(movie)}
    </div>
  )
}
