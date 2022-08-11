import React, { useCallback } from 'react'
import ShowCard from './ShowCard'
import IMAGE_NOT_FOUND from '../../Images/not-found.png'
import { FlexGrid } from '../Styled'
import { useShows } from '../../misc/custom-hooks'
const ShowGrid = ({data}) => {
  const [starredShows,dispatchStarred]=useShows()
  const onStarClick=useCallback((showId,isStarred)=>{
    if(isStarred){
      dispatchStarred({type:"REMOVE",showId:showId})
    }
    else{
      dispatchStarred({type:"ADD",showId:showId})
    }
  },[dispatchStarred])
  return (
    <FlexGrid>
        {
            data.map(({show})=>{
                return <ShowCard key={show.id}
                    onStarClick={onStarClick}
                    name={show.name}
                    isStarred={starredShows.includes(show.id)}
                    id={show.id}
                    image={show.image?show.image.medium:IMAGE_NOT_FOUND}
                    summary={show.summary}
                />
            })
        }
    </FlexGrid>
  )
}

export default ShowGrid