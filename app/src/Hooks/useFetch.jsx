import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url){
    
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    
    async function fetchData(){
        try{
            const response = await axios.get(url);
            setData(response.data);
            setLoading(false);
        }catch(err){
            console.log(err);
            setError("An error occurred while fetching the data");
            setLoading(false);
        }
        
    }

    useEffect(()=>{
        fetchData();
    },[url])

    return {  
        data: data,  
        loading: loading,  
        error: error,  
        refresh: () => {setLoading(!loading); fetchData()},
    };
}