import React from 'react'
import { useEffect,useReducer } from 'react';
import { useParams } from 'react-router-dom'
import Cast from '../components/shows/Cast';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import ShowMainData from '../components/shows/ShowMainData';
import { apiGet } from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';
const initialState={
    show:null,
    isLoading:true,
    error:null
}
const reducer=(prevState,action)=>{
    switch(action.type){
        case 'FETCH_SUCCESS':
            return{show:action.show,isLoading:false,error:null}
        case 'FETCH_FAILED':
            return{...prevState,error:action.error,isLoading:false}
        default: return prevState
    }

}
const Pages = () => {

    // let isMounted=true
    const {id}=useParams();
    const [{show,isLoading,error},dispatch]=useReducer(reducer,initialState)
    // const [show,setShow]=useState(null)
    // const [isLoading,setLoading]=useState(true)
    // const [error,setError]=useState(null)
    useEffect(()=>{
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then((result)=>{
            // if(isMounted){
                dispatch({type:'FETCH_SUCCESS',show:result})
            // }
            
        }).catch((err)=>{
            // if(isMounted){
                dispatch({type:'FETCH_FAILED',error:err.message})
            // }
        })
        // return (()=>{
        //     console.log("end")
        //     isMounted=false;
        // });
    },[id]);
    console.log(show);
    if(isLoading){
        return<div>your data is being loaded</div>
    }
    if(error){
        return<div>Error Occured : {error}</div>
    }
  return (
    <ShowPageWrapper>
        <ShowMainData name={show.name} image={show.image} rating={show.rating} tags={show.genres} summary={show.summary}/>
        <InfoBlock>
            <h2>Details</h2>
            <Details status={show.status} network={show.network} premeired={show.premeired}/>
        </InfoBlock>
        <InfoBlock>
            <h2>Seasons</h2>
            <Seasons seasons={show._embedded.seasons}/>
        </InfoBlock>
        <InfoBlock>
            <h2>Cast</h2>
            <Cast cast={show._embedded.cast}/>
        </InfoBlock>
    </ShowPageWrapper>
  )
}

export default Pages