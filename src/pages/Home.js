import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {
    const [input,setInput]=useState("")
    const  onInputChange=(event)=>{
        setInput(event.target.value)
    }
    const onSearch=()=>{
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r=>r.json()).then((result)=>{
            console.log(result)
        })
    }
    const onEnter=(ev)=>{
        if(ev.keyCode===13){
            onSearch();
        }
    }
  return (
    <MainPageLayout>
        <input type="text" onChange={onInputChange} value={input} onKeyDown={onEnter}></input>
        <button type="button" onClick={onSearch}>Search</button>
        This is the Home page
    </MainPageLayout>
  )
}

export default Home