import useHttp from "../hooks/http.hook";


const useMarvelServices = () =>{

    const {reqwest, errorClear, process, setProcess} = useHttp();

    const _apiKey = 'apikey=50e5395a1a1e4e4347c98612859f811c';
    const  _apiBase= 'https://gateway.marvel.com:443/v1/public/';
    const _baseOffset = 210;



    const getAllCharacters = async (offset = _baseOffset) =>{
        const res = await reqwest(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return  res.data.results.map(_transformCharater)}

    const getCharacter = async (id) =>{
        const res = await reqwest(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharater(res.data.results[0]);
    }

    const getCharacterByName = async (name) =>{
        console.log(name);
        const res = await reqwest(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return res.data.results.map(_transformCharater);
    }

    const getAllComics = async (offset = _baseOffset)=>{
        const res = await reqwest(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return  res.data.results.map(_transFormComics);

    }

    const getComics = async (id)=>{
        const res = await reqwest(`${_apiBase}comics/${id}?${_apiKey}`);
        return  _transFormComics(res.data.results[0]);

    }

    const _transFormComics = (comics)=>{
        return{
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description", 
            pageCount: comics.pageCount? `${comics.pageCount} p.`: "No information about the number of pages",
            prices: comics.prices[0].price,
            thumbnail: comics.thumbnail.path+ "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language ||"en-us",
        }


    }

    const _transformCharater =(char)=>{
        return {
            id:         char.id,
            name:       char.name,
            description: char.description ? `${char.description.slice(0, 210)}...`: "Нет Информации",
            thumbnail:  char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:   char.urls[0].url,
            wiki:       char.urls[1].url,
            comics:     char.comics.items
        }

    }
    
    return {getAllCharacters, 
            getCharacter, 
            errorClear, 
            process, 
            setProcess, 
            getAllComics, 
            getComics, 
            getCharacterByName}
}

export default useMarvelServices


