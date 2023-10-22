import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ComicsList = () => {
    const{errorClear, loading, error, getAllComics} = useMarvelServices();
    
    const [offset, setOffset] = useState(210);
    const [newComicsListLoading , setNewComiscListLoading] = useState(false);
    const [arr, setArr] = useState([]);

    useEffect(()=>{
        onRequest()
    },[])

    const onRequest = ()=>{
        setNewComiscListLoading(true)
        getAllComics(offset)
            .then((responce)=>{
                setArr([ ...arr, ...responce,])
                setOffset(offset + 8)
                setNewComiscListLoading(false);
            })
    }


    const renderItems =(arr)=>{
        return  arr.map((item, i) =>{
        return (
            <li 
                className="comics__item"
                key ={item.id}>
                <Link to = {`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{item.name}</div>
                    <div className="comics__item-price">{item.prices}</div>
                </Link>
            </li>
        ) 
        }) 
          
    }
    const items =  renderItems(arr);
       const errorr =  error?<ErrorMessage/>: null
       const spinnerr = loading?<Spinner/>: null

    return (
        <div className="comics__list">
            <ul className="comics__grid">
               {items}
               {errorr}
            </ul>
            {spinnerr}
            <button 
                onClick={() => onRequest()}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;