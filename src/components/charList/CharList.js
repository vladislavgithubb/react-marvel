import { useState, useEffect, useRef} from 'react';
import React from 'react';
import './charList.scss';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';


const CharList =(props)=> {

   const [charList, sethCarList] = useState([]);
   const [loading, setLoading] = useState(true);;
   const [error, setError] = useState(false);
   const [offset, setOffset] = useState(210);
   const [newCharListItem, setNewCharListItem] = useState(false);
   const [blockButton, setBlockButton] = useState(false);
   
  const refArr = useRef([]);

   const marvelService = new MarvelServices();

   const addRefFocus=(index)=>{

        refArr.current.forEach((item)=>{
            item.classList.remove('char__item_selected')
        })
            refArr.current[index].classList.add('char__item_selected')
            refArr.current[index].focus();
   }

   const refAdd=(ref ,i)=>{
        refArr.current[i] = (ref)
      
   }

    useEffect(()=>{
        onRequest()
   }, [])



    const onRequest=(offset)=>{

        setBlockButton(true)
        marvelService.getAllCharacters(offset)
        .then(onloaded)
        .catch(onError)
   }

   const onloaded =(newCharList)=>{
        let end = false;
        if (newCharList.length < 9 ){
            end = true
        }

        sethCarList((charList) =>[...charList, ...newCharList])
        setLoading(false);
        setOffset(offset => offset +9);
        setNewCharListItem(end);
        setBlockButton(false);
   }
   const onError = ()=>{
        setError(true);
        setLoading(false);
   }

   const renderItems=(arr)=>{
       const items = arr.map((item, i) =>{
            let imgStyle  = {'objectFit' : 'cover'}
            if(item.thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit' : 'unset'}
            }
            
            return(
                <li className="char__item"
                    onClick={()=>{props.addIdState(item.id); addRefFocus(i)}}
                    ref = {(ref)=> {refAdd(ref ,i)}}
                    tabIndex={'0'}
                    key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

            return (
                <ul className="char__grid">
                    {items}
                </ul>
            )
    }
   
    const items = renderItems(charList);

    const errorMessage = error?<ErrorMessage/>:null;
    const spinner = loading?<Spinner/>:null;
    const content = !(loading||error)?items:null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled = {blockButton}
                style={newCharListItem?{"display":"none"}: {"display":"block"}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
   }

CharList.propTypes={ 
    addIdState: PropTypes.func.isRequired
};

export default CharList;