import {createContext, useState} from 'react'
import * as React from "react";
//
// type MovieContextProviderProps = {
//     children: React.ReactNode
// }
// export default  function Con() {
//
//
// const MovieContext = createContext('')
//  const MovieContextProvider = ({children}:MovieContextProviderProps) => {
//     return
//     <MovieContext.Provider value={movieLink}>{children}</MovieContext.Provider>
// }
// }
interface Film {
    Title: string;
    Year: number;
    Poster: string;
    imdbID: string;
}
type UserContextType = {
    context: Film,
    setContext: React.Dispatch<React.SetStateAction<string | null>>
}

const iUserContextState = {
    context: null,
    setContext: () => {}
}

const MovieContext = createContext<{
    inputAutoValue: string | undefined,
    setInputAutoValue: (inputAutoValue:string  | undefined) => void
}>({
    inputAutoValue:undefined ,
    setInputAutoValue: () => undefined
})
export default MovieContext

