const API_BASE="https://api.tvmaze.com"

// fetch(`/search/shows?q=${input}`).then(r=>r.json()).then((result)=>{
//             console.log(result)
//             setResults(result)
//         })
export async function apiGet(querryString){
    const response=await fetch(`${API_BASE}${querryString}`).then(r=>r.json())
    return response;
}