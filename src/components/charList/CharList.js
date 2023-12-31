import { useState, useEffect, useRef, useMemo} from 'react';
import React from 'react';
import './charList.scss';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';

const setContent=(process, Component, loadingNewItems)=>{
    switch(process){
        case "waiting":
            return <Spinner/>
        case"loading":
            return  loadingNewItems?<Component/>:<Spinner/>
        case "confirmed":
            return <Component/>
        case "error":
            return <ErrorMessage/>
        default : throw new Error('Unexpected process state')
    }

}

const CharList =(props)=> {
    const {getAllCharacters, process, setProcess} = useMarvelServices()


   const [charList, sethCarList] = useState([]);
   const [offset, setOffset] = useState(210);
   const [blockButton, setBlockButton] = useState(false);
   const [loadingNewItems, setLoadingNewItems] = useState(false);
   
  const refArr = useRef([]);


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
        onRequest(offset, true)
   }, [])



    const onRequest=(offset , initial)=>{
        initial? setLoadingNewItems(false):setLoadingNewItems(true);
        setBlockButton(true)
        getAllCharacters(offset)
        .then(onloaded)
        .then(() => setProcess('confirmed'))
   }

   const onloaded =(newCharList)=>{
        setLoadingNewItems(false)
        let end = false;
        if (newCharList.length < 9 ){
            end = true
        }

        sethCarList((charList) =>[...charList, ...newCharList])
        setOffset(offset => offset +9);
        setLoadingNewItems(end);
        setBlockButton(false);
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
   
    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), loadingNewItems);
    }, [process])

    

    // const errorMessage = error?<ErrorMessage/>:null;
    // const spinner = loading && !loadingNewItems?<Spinner/>:null;
    // const content = items;

    return (
        <div className="char__list">
           {elements}
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled = {blockButton}
                style={loadingNewItems?{"display":"none"}: {"display":"block"}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
   }

CharList.propTypes={ 
    addIdState: PropTypes.func.isRequired
};

export default CharList;