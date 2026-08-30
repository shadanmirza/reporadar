import React from 'react'
import { useParams } from 'react-router-dom'

const RepoProfile = () => {
    const { owner, repo } = useParams()
  return (
    <div className='p-8'>
        <h1 className='text-2xl text-green-300 font-bold'> Repository: {owner}/{repo} </h1>
    </div>
  )
}

export default RepoProfile