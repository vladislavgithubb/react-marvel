import { useState } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import "./charSearchForm.scss";

 const SeachForm =()=> {
    const {getCharacterByName, loading , error} = useMarvelServices();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const[ char , setChar] = useState();
    const onSubmit = data => {
        getCharacterByName(data.Hero)
            .then(data => setChar(data))
            .catch()
    };
    const charCheck = Array.isArray(char)? (char.length)? 
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                            <Link to={`/Hero/${char[0].id}`} className="button button__secondary">
                                <div className="inner">To page</div>
                            </Link>
                        </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>:null

        
  return (
    <div className="char__search-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="char__search-wrapper">
                    <input  type="text" placeholder="Hero enter" {...register("Hero", {required: true, maxLength: 80})} />
                        <button className = "button button__main "type="submit">
                            <div className="inner">Go</div>
                        </button>
                </div>

                {charCheck}
            </form>
    </div>
  );
}

export default SeachForm;