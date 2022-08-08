import React from 'react'
import ShowCard from './ShowCard'
import IMAGE_NOT_FOUND from '../../Images/not-found.png'
import { FlexGrid } from '../Styled'
const ShowGrid = ({data}) => {
  return (
    <FlexGrid>
        {
            data.map(({show})=>{
                return <ShowCard key={show.id}
                    name={show.name}
                    id={show.id}
                    image={show.image?show.image.medium:IMAGE_NOT_FOUND}
                    summary={show.summa}
                />
            })
        }
    </FlexGrid>
  )
}

export default ShowGrid