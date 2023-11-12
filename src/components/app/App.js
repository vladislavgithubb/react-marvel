import AppHeader from "../appHeader/AppHeader";
import ComicsPages from '../pages/ComicsPages';
import MainPages from "../pages/MainPages";
import   {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Page404 from "../pages/Page404";
import SingleComic from "../pages/SingleComic";
import CharPages from "../pages/CharPages";


const App = () =>{

        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path = "/react-marvel" element = {<MainPages/> }/>    
                            <Route path = "/comics" element = {<ComicsPages/>}/>
                            <Route path="/comics/:id" element = {<SingleComic/>}/>
                            <Route path="/Hero/:id" element = {<CharPages/>}/>
                            <Route path= "*" element = {<Page404/>}/>
                        </Routes>

                    </main>
                </div>
            </Router>
        ) 
}

export default App;