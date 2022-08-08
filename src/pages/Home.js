import React, { useState } from 'react'
import ActorGrid from '../components/actors/ActorGrid'
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/shows/ShowGrid'
import { apiGet } from '../misc/config'

const Home = () => {
    const [input,setInput]=useState("")
    const [results,setResults]=useState(null)
    const [searchOption,setOption]=useState("shows")
    const isShows=(searchOption==='shows')
    const  onInputChange=(event)=>{
        setInput(event.target.value)
    }
    const onSearch=()=>{
        apiGet(`/search/${searchOption}?q=${input}`).then((result)=>{
            setResults(result)
        })
    }
    const onEnter=(ev)=>{
        if(ev.keyCode===13){
            onSearch();
        }
    }
    const render=()=>{
        if(!results)return null;
        if(results&&results.length===0)return <div>No results found</div>
        return (
        <div>
            {isShows?<ShowGrid data={results}/>:<ActorGrid data={results}/>}
        </div>
        );
    }
    const onRadioChange=(ev)=>{
        setOption(ev.target.value)
    }
  return (
    <MainPageLayout>
        <input type="text" onChange={onInputChange} value={input} onKeyDown={onEnter} placeholder="Search for Something"></input>
        <div>
            <label htmlFor='shows-search'>
                shows
                <input id="shows-search" type="radio" value="shows" checked={isShows} onChange={onRadioChange}></input>
            </label>
            <label htmlFor='actors-search'>
                Actors
                <input id="actors-search" type="radio" value="people" checked={!isShows} onChange={onRadioChange}></input>
            </label>
        </div>
        <button type="button" onClick={onSearch}>Search</button>
        <div>
        {render()}
        </div>
    </MainPageLayout>
  )
}

export default Home