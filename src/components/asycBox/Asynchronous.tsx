import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import About from "../about/About";
import {useState, useContext} from "react";
import MovieContext from '../MovieContext'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';

import  './Asynchronous.css'
interface Film {
    Title: string;
    Year: number;
    Poster: string;
    imdbID: string;
}


const MOVIES_API_KEY = 'ea5666d3';
export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState < readonly Film[]> ([]);
    const loading = open && options.length === 0;
    const [movieLink, setMovieLink] =  useState('');
    const {inputAutoValue, setInputAutoValue} = useContext(MovieContext)

    console.log(inputAutoValue)

    React.useEffect(() => {
        let active = true;
        if (!inputValue) {
            return undefined;
        }

        (async () => {
            let topFilms = [];
            try {
                const response = await fetch(`https://omdbapi.com/?s=${inputValue}&page=1&apikey=${MOVIES_API_KEY}`,
                )
                console.log(response)
                const data = await response.json()
                console.log('data = ', data)
                if (data.Response === "True") {
                    topFilms = data.Search;
                    console.log('data.Search = ', data.Search);
                    if (active) {
                        setOptions([...topFilms]);
                    }
                } else {
                    return undefined;
                }
                // setDataMovie(data.Poster)
            } catch (e) {
                console.error(e)
            }
            // console.log('value = ', value)
            // console.log('inputValue = ', inputValue)
            // console.log('options = ', options)

        })();
        return () => {
            active = false;
        };
    }, [inputValue]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    // console.log(topFilms)

    let arrayList = options.map((element, index) => {
 return (
     <>
         <Link href={`/about?${element.imdbID}`} target="_blank" >

         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={element.Poster} />
                </ListItemAvatar>
                <ListItemText
                    primary={element.Title }
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Year
                            </Typography>
                            {element.Year}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
         </Link>
     </>
 )
    })

    return (
        <div>

            <TextField
                style={{ backgroundColor: 'white', color: 'black', border: 'yellow'}}

                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={inputAutoValue}
                variant="filled"
                size="small"
                onChange={(event) => {
                    // console.log('newInputValue = ', newInputValue)
                    setInputValue(event.target.value);
                    setInputAutoValue(event.target.value)
                    // console.log('inputValue = ', inputValue)
                    // setInputAutoValue(event.target.value)
                    console.log('event.target.value: ',event.target.value)
                }}

            />
            {arrayList}



        {/*    <Autocomplete*/}
        {/*    // defaultValue={{ "The Godfather"}}*/}
        {/*    // value={{inputAutoValue}}*/}
        {/*    inputValue={inputAutoValue}*/}

        {/*    style={{ backgroundColor: 'white', color: 'black', border: 'yellow' }}*/}
        {/*    id="asynchronous-demo"*/}
        {/*    sx={{ width: 300 }}*/}
        {/*    open={open}*/}
        {/*    onOpen={() => {*/}
        {/*        setOpen(true);*/}
        {/*    }}*/}
        {/*    onClose={() => {*/}
        {/*        setOpen(false);*/}
        {/*    }}*/}
        {/*    onInputChange={(event, newInputValue) => {*/}
        {/*        console.log('newInputValue = ', newInputValue)*/}
        {/*        setInputValue(newInputValue);*/}
        {/*        console.log('inputValue = ', inputValue)*/}
        {/*        setInputAutoValue(newInputValue)*/}
        {/*        console.log('inputAutoValue = ', inputAutoValue)*/}

        {/*    }}*/}
        {/*    isOptionEqualToValue={(option, value) => option.Title === value.Title}*/}
        {/*    getOptionLabel={(option) => option.Title }*/}
        {/*    options={options}*/}
        {/*    loading={loading}*/}


        {/*    renderInput={(params) => (*/}
        {/*        <TextField*/}
        {/*            {...params}*/}
        {/*            label="Movie name"*/}
        {/*            InputProps={{*/}
        {/*                ...params.InputProps,*/}
        {/*                endAdornment: (*/}
        {/*                    <React.Fragment>*/}
        {/*                        {loading ? <CircularProgress color="inherit" size={20} /> : null}*/}
        {/*                        {params.InputProps.endAdornment}*/}
        {/*                    </React.Fragment>*/}
        {/*               ),*/}
        {/*            }}*/}
        {/*        />*/}
        {/*    )}*/}







        {/*    renderOption={(props, option) => {*/}
        {/*        // const linkMovieAbout = `https://omdbapi.com/?apikey=ea5666d3&i=${option.imdbID}&plot=full`;*/}
        {/*        const linkAbout = `/about?${option.imdbID}`*/}
        {/*        return (*/}
        {/*            <li {...props}>*/}
        {/*                <Grid container alignItems="center">*/}
        {/*                    <Grid item sx={{ display: 'flex', width: 144  }}>*/}
        {/*                        <img*/}
        {/*                            src={option.Poster !== 'N/A'? option.Poster : "image_not_found.png"}*/}
        {/*                            alt={option.Title}*/}
        {/*                            width="40px"*/}
        {/*                            loading="lazy"*/}
        {/*                        />*/}
        {/*                    </Grid>*/}
        {/*                    <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>*/}
        {/*                        {option.Year}*/}
        {/*                        <Typography variant="body2" color="text.secondary">*/}

        {/*                            <Link href={linkAbout} target="_blank" > {option.Title}</Link>*/}

        {/*                        </Typography>*/}
        {/*                    </Grid>*/}
        {/*                </Grid>*/}
        {/*            </li>*/}
        {/*            // <About link={movieLink}/>*/}
        {/*        );*/}
        {/*      }}*/}
        {/*/>*/}

        </div>
    );
}



