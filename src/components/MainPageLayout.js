import React from 'react'
import Nav from './Nav'
import Title from './Title'
const MainPageLayout = ({children}) => {
  return (
    <div>
        <Title title="BOX OFFICE" subtitle="search for any movie or actor"></Title>
        <Nav/>
        {children}
    </div>
  )
}

export default MainPageLayout