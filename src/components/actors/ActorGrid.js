import React from 'react'
import ActorCard from './ActorCard'
import IMAGE_NOT_FOUND from '../../Images/not-found.png'
import { FlexGrid } from '../Styled'
// import { StyledActorCard } from './ActorCard.Styled'
const ActorGrid = ({data}) => {
  return (
    <FlexGrid>
    {
        data.map(({person})=>{
            return <ActorCard key={person.id}
                name={person.name}
                id={person.id}
                image={person.image?person.image.medium:IMAGE_NOT_FOUND}
                birthday={person.birthday}
                deathday={person.deathday}
                gender={person.gender}
                country={person.country?person.country.name:null}
            />
        })
    }
    </FlexGrid>
  )
}

export default ActorGrid