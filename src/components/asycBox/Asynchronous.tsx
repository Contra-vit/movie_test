import * as React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import {useState, useContext} from "react";
import MovieContext from '../MovieContext'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
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
    // const loading = open && options.length === 0;
    const [movieLink, setMovieLink] =  useState('');
    const {inputAutoValue, setInputAutoValue} = useContext(MovieContext)

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
                const data = await response.json()
                if (data.Response === "True") {
                    topFilms = data.Search;
                    if (active) {
                        setOptions([...topFilms]);
                    }
                } else {
                    return undefined;
                }
            } catch (e) {
                console.error(e)
            }

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
    let arrayList = options.map((element, index) => {
       return (
           <>
         <Link href={`/about?${element.imdbID}`} target="_blank" >
         <List key={element.imdbID} sx={{ width: '100%', maxWidth: 360,  bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar variant='square' alt="Remy Sharp" src={element.Poster != "N/A" ? element.Poster: 'image_not_found.png' } />
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
                // value={inputAutoValue}
                // defaultValue={inputAutoValue}
                variant="filled"
                size="small"
                onChange={(event) => {
                    setInputValue(event.target.value);
                    setMovieLink(event.target.value)

                    console.log('event.target.value: ',event.target.value)
                }}
            />
            {arrayList}
        </div>
    );
}



