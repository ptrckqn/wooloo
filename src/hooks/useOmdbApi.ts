import { useState } from 'react'

interface Rating {
  Source: string
  Value: string
}

interface Episode {
  Title: string;
  Released: string;
  Episode: string;
  imdbRating: string;
  imdbID: string;
}

export interface MovieSearchType {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
  Rated?: string
  Released?: string
  Runtime?: string
  Genre?: string
  Director?: string
  Writer?: string
  Actors?: string
  Plot?: string
  Language?: string
  Country?: string
  Awards?: string
  Ratings?: Rating[]
  Metascore?: string
  imdbRating?: string
  imdbVotes?: string
  totalSeasons?: string
}


const API_KEY = process.env.REACT_APP_OMDB_API_KEY

export const useOmdbApi = () => {
  const [omdbRes, setOmdbRes] = useState<MovieSearchType[]>()
  const [episodes, setEpisodes] = useState<Episode[]>()

  const searchOmdb = async (query: string) => {
    const omdbApi = new URL('https://www.omdbapi.com/')
    omdbApi.searchParams.set('apikey', API_KEY || '')
    omdbApi.searchParams.set('s', query)

    const res = await fetch(omdbApi)
    if (res.ok) {
      const data = await res.json()
      setOmdbRes(data.Search)
    }
  }

  const getById = async (id: string) => {
    const omdbApi = new URL('https://www.omdbapi.com/')
    omdbApi.searchParams.set('apikey', API_KEY || '')
    omdbApi.searchParams.set('i', id)

    const res = await fetch(omdbApi)
    if (res.ok) {
      const data = await res.json()
      setOmdbRes([data])
    }
  }

  const getByIdAndSeason = async (id: string, season: string) => {    
    const omdbApi = new URL('https://www.omdbapi.com/')
    omdbApi.searchParams.set('apikey', API_KEY || '')
    omdbApi.searchParams.set('i', id)
    omdbApi.searchParams.set('Season', season)
    const res = await fetch(omdbApi)
    if (res.ok) {
      const data = await res.json()
      setEpisodes(data.Episodes)
    }
  }
  return {
    omdbRes,
    episodes,
    searchOmdb,
    getById,
    getByIdAndSeason,
  }
}
