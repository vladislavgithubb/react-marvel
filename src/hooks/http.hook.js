import {useState, useCallback} from 'react'

const useHttp = ()=>{
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState(false);

    const reqwest = useCallback(async(url, method = "GET", body = null, headers = {"Content-Type": "application/json"} )=>{
        setLoading(true)
        const response = await fetch(url, {method, body , headers} ) 

        try{
            if(!response.ok){
                throw new Error (`Error responce ${response.status}`)
            }

            const data =  await response.json()
            setLoading(false)
            return  data
            }
            catch(e){
                setLoading(false)
                setError(true)
                throw (e.error)  
            }

    },[])

    const errorClear= useCallback(()=>{
        setError(false);
    },[])

    return {reqwest, errorClear, loading, error}
}

export default useHttp;