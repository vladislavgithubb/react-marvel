import AppHeader from "../appHeader/AppHeader";
import ComicsPages from '../pages/ComicsPages';
import MainPages from "../pages/MainPages";
import   {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Page404 from "../pages/Page404";
import CharPages from "../pages/CharPages";
import { lazy } from "react";
import { Suspense } from "react/cjs/react.production.min";
import Spinner from "../spinner/Spinner";


const SingleComic = lazy(()=> import ("../pages/SingleComic"))

const App = () =>{

        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <Suspense fallback = {<Spinner/>}>
                    <main>
                        <Routes>
                            <Route path = "/react-marvel" element = {<MainPages/> }/>    
                            <Route path = "/comics" element = {<ComicsPages/>}/>
                            <Route path="/comics/:id" element = {<SingleComic/>}/>
                            <Route path="/Hero/:id" element = {<CharPages/>}/>
                            <Route path= "*" element = {<Page404/>}/>
                        </Routes>

                    </main>
                    </Suspense>
                </div>
            </Router>
        ) 
}

export default App;