import { useCallback, useEffect, useReducer, useState } from "react";
import { apiGet } from "../misc/config"

function showsReducer(prevstate,action){
    switch(action.type){
        case 'ADD':return [...prevstate,action.showId];
        case 'REMOVE':return prevstate.filter((showId)=>(showId!==action.showId))
        default : return prevstate
    }
}

function usePersistanceReducer(reducer,initialState,key){
    const [state,dispatch]=useReducer(reducer,initialState,(initial)=>{
        const persisted=localStorage.getItem(key);

        return persisted?JSON.parse(persisted):initial;
    })
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(state))
    },[state,key])
    return [state,dispatch]
}

export function useShows(key='shows'){
    return usePersistanceReducer(showsReducer,[],key);
}

export function useLastQuery(key='lastQuery'){
    const [input,setInput]=useState(()=>{
        const persisted=sessionStorage.getItem(key);

        return persisted?JSON.parse(persisted):'';
    })
    const setPersistedInput=useCallback((newState)=>{
        setInput(newState)
        sessionStorage.setItem(key,JSON.stringify(newState))
    },[key])
    return [input,setPersistedInput]
}
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
export function useShow(id){
    // const {id}=useParams();
    const [state,dispatch]=useReducer(reducer,initialState)
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
    return state
}