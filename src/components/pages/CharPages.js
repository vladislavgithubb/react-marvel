import useMarvelServices from '../../services/MarvelServices';
import './singleComic.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import setContent from '../../utils/setContent';


const CharPages = () => {
    const {id} = useParams()
    const {errorClear, process, setProcess,getCharacter} = useMarvelServices();

    const [char, setChar] = useState();
    useEffect(()=>{
        reqwestComic(id);
    },[])

    const reqwestComic =(id)=>{
        errorClear()
        getCharacter(id)
            .then((data)=>{setChar(data);  console.log(data)})
            .then(()=>setProcess("confirmed"))
            
            console.log(process);
    }

    // const content = !(loading || error || !char)?<View data = {char}/>:null;
    // const errorComics = error? <ErrorMessage/>:null;
    // const loadingComics = loading? <Spinner/>:null;

    return (
        <>
        {setContent(process, View, char)}
        </>
    )
}

    const View = ({data}) =>{ 
        return(
            <div className="single-comic">
            <Helmet>
                <meta name= "description " content ={`${data.name} Text comix books`} />
                <title>{`${data.name}`}</title>
            </Helmet>
            <img src={data.thumbnail} alt="" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{data.name}</h2>
                <p className="single-comic__descr">{data.description}</p>
                </div>
                <Link to="/" className="single-comic__back">Back to all</Link>
            </div>
        )

    }

export default CharPages;