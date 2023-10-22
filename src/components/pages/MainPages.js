import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { useState } from "react"
    
   
const MainPages =()=>{
    const [id, setId] = useState(null);

    const addIdState=(id)=>{

        setId(id);
    }
    return(
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList  addIdState = {addIdState}/>
                <ErrorBoundary>
                    <CharInfo appState = {id}/>
                </ErrorBoundary> 
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPages;
    
    
    
