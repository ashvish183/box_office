import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'
import {useShows} from '../misc/custom-hooks'
import {apiGet} from '../misc/config'
import ShowGrid from '../components/shows/ShowGrid'
const Starred = () => {

  const [starred]=useShows()

  const [shows,setShows]=useState(null)
  const [isLoading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  
  if(starred&&starred.length>0){
    const promises=starred.map((showId)=>(apiGet(`/shows/${showId}`)))
    Promise.all(promises).then((r=>(r.map((res)=>({show:res})))))
    .then(result=>{
      setShows(result)
      setLoading(false)
    }).catch(err=>{
      setLoading(false)
      setError(err)
    })
  }
  else{
    setLoading(false)
  }
  return (
    <MainPageLayout>
      {isLoading&&<div>page is still loading</div>}
      {error&&<div>Error Occuered{error}</div>}
      {!isLoading&&!error&&!shows&& <div>No shows were added</div>}
      {!isLoading&&!error&&shows&&<ShowGrid data={shows}></ShowGrid>}
    </MainPageLayout>
  )
}

export default Starred