import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { useState } from "react"
import SeachForm from "../seachForm/SeachForm";
import { Helmet } from "react-helmet";
    
   
const MainPages =()=>{
    const [id, setId] = useState(null);

    const addIdState=(id)=>{

        setId(id);
    }
    return(
        <>
            <Helmet>
                <meta name="description"content="Marvel information portal" />
                <title>Marvel information portal</title>
            </Helmet>
            <RandomChar/>
            <div className="char__content">
                <CharList  addIdState = {addIdState}/>
                <ErrorBoundary>
                 <div className="div">
                    <CharInfo appState = {id}/>
                    <SeachForm/>
                 </div>
                </ErrorBoundary> 
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPages;
    
    
    
