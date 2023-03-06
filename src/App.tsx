import React from 'react';
import './App.css';
import Asynchronous from "./components/asycBox/Asynchronous";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from "./components/about/About";


function App() {
  return (
    <div className="App">
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
                    <Router>
                        <Routes>
                            <Route path="/" element={<Asynchronous />} />
                            <Route path="/about" element ={<About link={'gooo'}/> } />
                        </Routes>
                    </Router>
                </div>

            </div>
            {/* end of search container*/}



            {/*<FreeSoloCreateOption/>*/}
        </div>


        {/*<Asynchronous/>*/}
    </div>
  );
}

export default App;
