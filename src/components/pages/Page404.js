import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";


const Page404 = ()=>{
    return(
        <>
        <div style={{"textAlign":"center" , "fontSize" : "30px", "fontWeight": "700"} }>404 Page doesn't exist</div>
        <ErrorMessage/>
        <Link to = "/react-marvel"
            style={{"display":"block","textAlign":"center" , "fontSize" : "20px", "fontWeight": "900"}}>Back to main pages</Link>
        </>         

    )

}
export default Page404;