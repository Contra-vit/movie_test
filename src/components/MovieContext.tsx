import {createContext, useState} from 'react'
import * as React from "react";

interface Film {
    Title: string;
    Year: number;
    Poster: string;
    imdbID: string;
}

const MovieContext = createContext<{
    inputAutoValue: Array<any>,
    setInputAutoValue: (inputAutoValue: Array<any>) => void
}>({
    inputAutoValue: [],
    setInputAutoValue: () => undefined
})
export default MovieContext

