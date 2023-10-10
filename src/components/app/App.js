import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react"
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const App = () =>{
    const [id, setId] = useState(null);

 const addIdState=(id)=>{

        setId(id);
    }

   
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList  addIdState = {addIdState}/>
                        <ErrorBoundary>
                            <CharInfo appState = {id}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        ) 
}

export default App;