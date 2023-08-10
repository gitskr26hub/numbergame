import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Home.css'
import Slider from '@mui/material/Slider';
import buttonSound from './MP3/button2.mp3'
import GameMusicPlayer from './GameMusicPlayer';
import { useNavigate } from 'react-router-dom';


const difficultyLabels = ['Easy', 'Medium', 'Hard'];

const Home = () => {

  var audio = new Audio(buttonSound)
  const [difficulty, setDifficulty] = useState(0);

  const navigate = useNavigate()

  const handleSliderChange = (event, newValue) => {

    setDifficulty(newValue);

  }


  function StartGame() {
   // sessionStorage.removeItem("Gamedifficullty")

    console.log(sessionStorage.getItem("Gamedifficullty"))

    setTimeout(() => {

      let payload = {};


      if (difficulty == 0) {
        payload = {
          level: difficultyLabels[difficulty],
          arr: [],
          timing: 30
        }
        for (var i = 0; i < 6; i++) {
          payload.arr.push(Math.floor(Math.random() * 1000 + 1))
        }
        sessionStorage.setItem("Gamedifficullty", JSON.stringify(payload))

      }
      else if (difficulty == 1) {
        payload = {
          level: difficultyLabels[difficulty],
          arr: [],
          timing: 60
        }
        for (var i = 0; i < 10; i++) {
          payload.arr.push((Math.random() * 1000 + 1).toFixed(2))
        }

        sessionStorage.setItem("Gamedifficullty", JSON.stringify(payload))

      }
      else {
        payload = {
          level: difficultyLabels[difficulty],
          arr: [],
          timing: 90,

        }
        for (var i = 0; i < 15; i++) {
          payload.arr.push((Math.random() * 3000 + 3.5).toFixed(3))
        }
        sessionStorage.setItem("Gamedifficullty", JSON.stringify(payload))
      }
      // console.log(payload)
     


      navigate("/game")

    }, [1000])
  }

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, x: '100vh' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="login-form">
          <motion.h1 style={{textAlign:"center",color:"orangered"}} initial={{ opacity: 0, y: '-100vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}>Number Game</motion.h1>

        <motion.h2 style={{textAlign:"center"}} initial={{ opacity: 0, y: '-100vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}> Select Difficulty Level</motion.h2>

        <motion.div className="form-group" initial={{ opacity: 0, x: '-100vh' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}>
          <Slider
            color='warning'
            value={difficulty}
            onChange={handleSliderChange}
            aria-labelledby="difficulty-slider"
            step={1}
            min={0}
            max={2}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => difficultyLabels[value]}
          />
        </motion.div>
        {/* <GameMusicPlayer/> */}

        <motion.button onClick={() => { audio.play(); StartGame() }} className='button-29' initial={{ opacity: 0, y: '100vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }} type="submit">STA𝕽T 𝕲AM𝕰</motion.button>

      </motion.div>
    </div>
  );
};

export default Home;
