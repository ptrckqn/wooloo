import React from 'react'
import { useParams } from 'react-router-dom'

export const Movie = () => {
  const { movieId } = useParams()
  return <div>Movie Page - {movieId}</div>
}
