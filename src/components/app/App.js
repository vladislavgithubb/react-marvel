import AppHeader from "../appHeader/AppHeader";
import ComicsPages from '../pages/ComicsPages';
import MainPages from "../pages/MainPages";
import   {BrowserRouter as Router,Routes,Route} from "react-router-dom";


const App = () =>{

        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path = "/react-marvel" element = {<MainPages/>}/>    
                            <Route path = "/comics" element = {<ComicsPages/>}/>  
                        </Routes>

                    </main>
                </div>
            </Router>
        ) 
}

export default App;