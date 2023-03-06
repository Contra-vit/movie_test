import React, {FC, useEffect, useRef, useState} from 'react';
import FreeSoloCreateOption from "../textBox/TextBox";
import './main.css'

// interface T {
//     T :  () => void;
// }
const Main:FC = () => {

//     console.log('Before')
//     const url:string = 'https://www.omdbapi.com/?i=tt3896198&apikey=ea5666d3'
// const [dataMovie, setDataMovie] = useState()
//     useEffect( () => {
//
//        async function  fetchMovie() {
//             try{
//                 const response = await fetch(url)
//                 console.log(response)
//
//                 const data = await response.json()
//                 console.log( data)
//                 setDataMovie(data.Poster)
//             }catch (e){
//                 console.error(e)
//             }
//         }
//         fetchMovie()
//
//     })

    const [searchTermState, setSearchTermState] = useState<string | undefined>()
    const [movieSearchBoxState, setMovieSearchBoxState] = useState<string | undefined>('')
    interface  Imovies {
        imdbID: string;
        Poster: string;

    }
interface DisplayMovieListProps {
    movies: Imovies;
}
interface IDataset {
     id:    Imovies
}
interface IMoviesData {
    dataset: IDataset;
    }
    interface IDetails {
        Poster:string;
        Title : string;
        Year: number;
        Rated: number;
        Released: string;
       Genre: string;
        Writer:string;
        Actors: string;
        Plot:string;
      Language:string;
      Awards:string;
    }
    interface DisplayMovieDetailsProps {
        details : IDetails
    }

    interface GlobalEventHandlersEventMap {
        "click": MouseEvent
    }


    const movieSearchBox = document.getElementById('movie-search-box') as HTMLInputElement | null ;
console.log( movieSearchBox)
    const searchList = document.getElementById('search-list') as HTMLDivElement;
console.log(searchList)
    const resultGrid = document.getElementById('result-grid') as HTMLDivElement;

function onChangeInputValue (){
    setMovieSearchBoxState(movieSearchBox?.value)
}
// load movies from API

    async function loadMovies(searchTerm: string){
        const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=ea5666d3`;
        const res = await fetch(`${URL}`);
        const data = await res.json();
        console.log(data.Search);
        if(data.Response == "True") displayMovieList(data.Search);
    }
    function findMovies(){
        // setMovieSearchBoxState(movieSearchBox?.value)
        let searchTerm = (movieSearchBox?.value);
        console.log(movieSearchBox?.value)
        setSearchTermState(movieSearchBox?.value)
        if (searchTermState != undefined) {
        if(searchTermState.length > 0){
            searchList.classList.remove('hide-search-list');
            loadMovies(searchTermState);
        } else {
            searchList.classList.add('hide-search-list');
        }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function displayMovieList<DisplayMovieListProps>(movies: string | any[]){
        searchList.innerHTML = "";
        let moviePoster = ''
        for(let idx = 0; idx < movies.length; idx++){
            let movieListItem = document.createElement('div') as HTMLDivElement;
            movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
            movieListItem.classList.add('search-list-item');
            if(movies[idx].Poster != "N/A")
                 moviePoster = movies[idx].Poster;
            else
                 moviePoster = "image_not_found.png";

            movieListItem.innerHTML = `
        <div className = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div className = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
            searchList.appendChild(movieListItem);
        }
        loadMovieDetails();
    }

    function loadMovieDetails(){
        const searchListMovies = [...Array.from(searchList.querySelectorAll('.search-list-item'))];
        console.log(searchListMovies)
        searchListMovies.forEach((movie) => {
            movie.addEventListener('click', async () => {
                // console.log(movie.dataset.id);
                searchList.classList.add('hide-search-list');
                setMovieSearchBoxState('')
                // movieSearchBox.value = "";
                const result = await fetch(`http://www.omdbapi.com/?i=${movie.id}&apikey=fc1fef96`);
                const movieDetails = await result.json();
                // console.log(movieDetails);
                displayMovieDetails(movieDetails);
            });
        });
    }
    function displayMovieDetails({details}: DisplayMovieDetailsProps){
        resultGrid.innerHTML = ` 
    <div className = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div className = "movie-info">
        <h3 className = "movie-title">${details.Title}</h3>
        <ul className = "movie-misc-info">
            <li className = "year">Year: ${details.Year}</li>
            <li className = "rated">Ratings: ${details.Rated}</li>
            <li className = "released">Released: ${details.Released}</li>
        </ul>
        <p className = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p className = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p className = "actors"><b>Actors: </b>${details.Actors}</p>
        <p className = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p className = "language"><b>Language:</b> ${details.Language}</p>
        <p className = "awards"><b><i className = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
    }
    // window.addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;

    // window.addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;

    window.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLTextAreaElement
        const element = target.className
        if("form-control" != element){
            searchList.classList.add('hide-search-list');
        }
    });


    return (
        <div className='wrapper'>
             {/*logo*/}
            <div className='logo'>
                <div className='container'>
                    <p> Movie  OMDB</p>

                </div>

            </div>
             {/*end of logo*/}

            {/*search container*/}
            <div className="search-container">
                <div className="search-element">
                    <h3>Search Movie:</h3>
                    <input type="text" className="form-control" placeholder="Search Movie Title ..."
                           id="movie-search-box" onKeyUp={findMovies} onClick={findMovies} onChange={onChangeInputValue} value={movieSearchBoxState}/>

                        <div className="search-list"   id="search-list">

                        </div>
                </div>
            </div>
            {/* end of search container*/}

            {/*// result container */}
            <div className= "container">
                <div className= "result-container">
                    <div className= "result-grid" id = "result-grid">

                    </div>
                </div>
            </div>
            {/*end of result container */}

            {/*<FreeSoloCreateOption/>*/}
        </div>

    );
};

export default Main;