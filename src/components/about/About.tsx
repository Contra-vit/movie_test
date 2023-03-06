import React, {useEffect, useState} from 'react';
import { Navigate } from "react-router-dom";
import './About.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface AboutProps {
    link:string;
}
interface IAboutMovie {
    Title: string;
    Year: number;
    Poster: string;
    imdbID: string;
    Plot: string;
}
const About = ({link}: AboutProps) => {
    const [navToSearch, setNavToSearch] = useState(false)
    const [dataMovie, setDataMovie] = useState <IAboutMovie> ()
    let aboutUrl = window.location.href
    let movieId = aboutUrl.split('?')[1]; // grabs the part on the right of the ?
    console.log(movieId)
    const linkMovieAbout = `https://omdbapi.com/?apikey=ea5666d3&i=${movieId}&plot=full`;


        useEffect( () => {

       async function  fetchMovie<IAboutMovie>() {
            try{
                const response = await fetch(linkMovieAbout)
                console.log(response)

                const data = await response.json()
                console.log( data)
                setDataMovie(data)
            }catch (e){
                console.error(e)
            }
        }
        fetchMovie()


},[])

    console.log(dataMovie)

    if(navToSearch){
        return   <Navigate to={'/'}/>
    }


    return (
        <div className='about_main'>
            <div className='about_main_container'>

                 <div className='about_movie_container'>
                     <div>
                         <img src={dataMovie?.Poster}/>
                     </div>
                     <div className='about_movie_text'>
                         <div > Year: {dataMovie?.Year}</div>
                         <div>{dataMovie?.Plot}</div>
                     </div>
                 </div>
                <div className='about_buttonSearch'>
                    {/*<button  onClick={ () => {setNavToSearch(true)}}>Back to search</button>*/}
                    <Stack spacing={2} direction="row">
                        <Button style={{color:'white', }} variant="outlined" onClick={ () => {setNavToSearch(true)}}>Back to search</Button>
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default About;



