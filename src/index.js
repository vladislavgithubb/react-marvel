import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';
import MarvelServices from './services/MarvelServices';

// const marvel = new MarvelServices();
// marvel.getAllCharacters().then(res => console.log(res))
// marvel.getCharacter(1011027).then(res => console.log(res))
// marvel.getAllCharacters().then(res=> res.data.results.forEach(item =>console.log(item.name)))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

