import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MovieContext from './components/MovieContext'

function Main(){
    const [inputAutoValue, setInputAutoValue] = useState<Array<any> >([]);

    return(
        <MovieContext.Provider value={{inputAutoValue, setInputAutoValue}}>
            <App />
        </MovieContext.Provider>

    )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <Main />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
