import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { Input } from 'components/Input'
import { Select } from 'components/Select'
import { useOmdbApi, MovieSearchType } from 'hooks/useOmdbApi'

export const Movie = () => {
  const { movieId } = useParams()
  const { omdbRes, getById } = useOmdbApi()

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (movieId) {
      getById(movieId)
    }
  }, [movieId])

  const handleSeriesInfo = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    searchParams.set(key, e.target.value)
    setSearchParams(searchParams)
  }

  const renderPlayer = (movie: MovieSearchType) => {
    let vidUrl = `https://vidsrc.me/embed/${movie.imdbID}`

    if (movie.Type === 'series') {
      const season = searchParams.get('s')
      const episode = searchParams.get('e')
      if (!season || !episode) {
        return null
      }
      vidUrl += `/${season}-${episode}`
    }

    return (
      <div className='relative mt-4 h-0 overflow-hidden' style={{ paddingBottom: '56.25%' }}>
        <iframe
          width='853'
          height='480'
          src={vidUrl}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Embedded Video'
          className='absolute left-0 h-full w-full'
        />
      </div>
    )
  }

  if (!omdbRes) {
    return null
  }

  const movie = omdbRes[0]
  console.log('movie', movie)
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
              <Select
                value={searchParams.get('s') || '1'}
                options={Array.from({ length: parseInt(movie?.totalSeasons ?? "1") }, (_, i) => ({
                  value: `${i + 1}`,
                }))}
                onChange={handleSeriesInfo('s')}
              />
            </div>
            <div className='mx-2 flex items-center'>
              <div className='mr-2'>Episode: </div>
              <Input value={searchParams.get('e') || ''} onChange={handleSeriesInfo('e')} small />
            </div>
          </div>
        </div>
      )}

      {movie && renderPlayer(movie)}
    </div>
  )
}
