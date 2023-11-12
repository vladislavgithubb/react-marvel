import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import { Helmet } from "react-helmet";


const ComicsPages = ()=>{
   return(
    <> 
         <Helmet>
                <meta name= "description " />
                <title>Marvel comics</title>
        </Helmet>

        <AppBanner/>
        <ComicsList/>
    </>
   )
}
export default ComicsPages