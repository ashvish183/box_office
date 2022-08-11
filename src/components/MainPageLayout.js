import React from 'react'
import Nav from './Nav'
import Title from './Title'
const MainPageLayout = ({children}) => {
  return (
    <div>
        <Title title="BOX OFFICE" subtitle="Are you looking for a Movie or an Actor?  "></Title>
        <Nav/>
        {children}
    </div>
  )
}

export default MainPageLayout