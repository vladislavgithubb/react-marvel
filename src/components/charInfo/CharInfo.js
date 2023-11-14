import './charInfo.scss';
import useMarvelServices from '../../services/MarvelServices';
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';
import setContent from '../../utils/setContent';

const CharInfo = (props)=>{
    const { getCharacter,  process, setProcess} = useMarvelServices();
    const [char, setChar] = useState(null);


    useEffect(()=>{
        updateChar()
    },[]);

    useEffect(()=>{
            updateChar();
    }, [props.appState])


   const  updateChar = () => {
        const {appState} = props;
        if (!appState) {
            return;
        }

       

            getCharacter(appState)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }


        // const skeleton = char || loading || error ? null : <Skeleton/>;
        // const errorMessage = error ? <ErrorMessage/> : null;
        // const spinner = loading ? <Spinner/> : null;
        // const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
               {setContent(process, View, char)}
            </div>
        )
    }

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }                
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    appState: PropTypes.number
  }

export default CharInfo;