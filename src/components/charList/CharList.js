import { Component} from 'react/cjs/react.production.min';
import React from 'react';
import './charList.scss';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';


class CharList extends Component {
    state={
        charList: [],
        loading: true,
        error: false,
        offset:210,
        newCharListItem: false,
        blockButton:false

   }
    
   
   refArr = [];

   marvelService = new MarvelServices();

   addRefFocus=(index)=>{

        this.refArr.forEach((item )=>{
            item.classList.remove('char__item_selected')
        })
            this.refArr[index].classList.add('char__item_selected')
            this.refArr[index].focus();
   }

   refAdd=(ref)=>{
    this.refArr.push(ref)
   }

   componentDidMount() {
       this.onRequest()
   }


   onRequest=(offset)=>{
    this.setState({
        blockButton:true
    })


    this.marvelService.getAllCharacters(offset)
        .then(this.onloaded)
        .catch(this.onError)
   }

   onloaded =(newCharList)=>{
        let end = false;
        if (newCharList.length < 9 ){
            end = true
        }
        
    this.setState(({charList, offset})=>({
        charList: [...charList, ...newCharList],
        loading:false,
        offset: offset +9,
        newCharListItem: end,
        blockButton: false
    }))
   }
   onError = ()=>{
    this.setState({
        error:true,
        loading:false
    })
   }

   renderItems=(arr)=>{
       const items = arr.map((item, i) =>{
            let imgStyle  = {'objectFit' : 'cover'}
            if(item.thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit' : 'unset'}
            }
            
            return(
                <li className="char__item"
                    onClick={()=>{this.props.addIdState(item.id); this.addRefFocus(i)}}
                    ref = {this.refAdd}
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
   

   render(){
    const {loading , error, charList, offset, newCharListItem, blockButton} = this.state;
    const items = this.renderItems(charList);

    const errorMessage = error?<ErrorMessage/>:null;
    const spinner = loading?<Spinner/>:null;
    const content = !(loading||error)?items:null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long"
                onClick={() => this.onRequest(offset)}
                disabled = {blockButton}
                style={newCharListItem?{"display":"none"}: {"display":"block"}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
   }
}
CharList.propTypes={ 
    addIdState: PropTypes.func.isRequired
};

export default CharList;