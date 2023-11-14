import {useState, useCallback} from 'react'

const useHttp = ()=>{
    const [process, setProcess] = useState("waiting")

    const reqwest = useCallback(async(url, method = "GET", body = null, headers = {"Content-Type": "application/json"} )=>{
        setProcess("loading")
        try{
            const response = await fetch(url, {method, body , headers} ) 
            if(!response.ok){
                throw new Error (`Error responce ${response.status}`)
            }

            const data =  await response.json()
            return  data
            }
            catch(e){
                setProcess("error")
                throw (e)  
            }

    },[])

    const errorClear= useCallback(()=>{
        setProcess("loading");
    },[])

    return {reqwest, errorClear, process,setProcess}
}

export default useHttp;