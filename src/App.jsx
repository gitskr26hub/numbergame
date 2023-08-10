
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import GameMusicPlayer from './GameMusicPlayer';
import Game from './Game';

const App = () => {



  return (
    <>
      <GameMusicPlayer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </>
  );
};
export default App;





