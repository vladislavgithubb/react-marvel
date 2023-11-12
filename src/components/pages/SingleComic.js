import useMarvelServices from '../../services/MarvelServices';
import './singleComic.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import { Helmet } from 'react-helmet';


const SingleComic = () => {
    const {id} = useParams()
    const {errorClear, loading, error, getComics} = useMarvelServices();

    const [comics, setComics] = useState({});
    useEffect(()=>{
        reqwestComic(id);
    },[])

    const reqwestComic =(id)=>{
        errorClear()
        getComics(id)
            .then((data)=>setComics(data))
    }

    const content = !error||!loading?<View data = {comics}/>:null;
    const errorComics = error? <ErrorMessage/>:null;
    const loadingComics = loading? <Spinner/>:null;

    return (
        <>
        {loadingComics}
        {errorComics}
        {content}
        </>
    )
}

    const View = ({data}) =>{ 
        return(

                <div className="single-comic">
                    <Helmet>
                            <meta name= "description " content ={`${data.title} Text comix books`} />
                            <title>{`${data.title}`}</title>
                    </Helmet>
                    <img src={data.thumbnail} alt="x-men" className="single-comic__img"/>
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{data.title}</h2>
                        <p className="single-comic__descr">{data.description}</p>
                        <p className="single-comic__descr">{data.pageCount}</p>
                        <p className="single-comic__descr">{data.language}</p>
                        <div className="single-comic__price">{data.prices}</div>
                        </div>
                        <Link to="/comics" className="single-comic__back">Back to all</Link>
                </div>
          
        )

    }


export default SingleComic;