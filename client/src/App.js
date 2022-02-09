import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import LandingPage from './components/LandingPage';
import Home from './components/Home'
import CreateVideogame from './components/VideogameCreate';
import Detail from './components/Detail';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {getVideogames, getGenres} from './actions'


function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getVideogames())
    dispatch(getGenres())
  },[dispatch])

  return (
    <>
      <Routes>
        <Route path='/' exact element={<LandingPage />}/>
        <Route path='/home' exact element={<Home />}/>
        <Route path='/createVideogame' exact element={<CreateVideogame />}/>
        <Route path='/detail/:id' exact element={<Detail />}/>
      </Routes>
    </>
  );

}

export default App;
