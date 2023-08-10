import React, { useRef, useState } from 'react';
import song1 from "./Songs/Gaddiyan-Uchiya-Rakhiya.mp3"
import song2 from "./Songs/Kahani.mp3"
import song3 from "./Songs/man_meri_jan.mp3"
import song4 from "./Songs/Sajna_Say_Yes_To_The_Dress_1.mp3"
import song5 from "./Songs/Calm Down.mp3"
import song6 from "./Songs/Despacito.mp3"
import { motion } from 'framer-motion';

import "./GameMusicPlayer.css"

import {FaPlay,FaPause} from "react-icons/fa"
import {GiNextButton,GiPreviousButton} from "react-icons/gi"

const songs = [
    { title: 'Gaddiyan-Uchiya-Rakhiya', src: song1 },
    { title: 'Kahani', src: song2 },
    { title: 'man meri jan', src: song3 },
    { title: 'Sajna Say Yes To The Dress', src: song4 },
    { title: 'Calm Down', src: song5 },
    { title: 'Despacito', src: song6 },
 
  ]; 


const GameMusicPlayer = () => {
 const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);


  const playNextSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
   
  };

  const playPrevSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
  };


  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.div 
 
  whileTap={{ scale: 1.1 }}
  drag="x"
  dragConstraints={{ left: -25, right: 25 }}

    className="music-player">
      <h3>{songs[currentSongIndex].title}</h3>

      <audio src={songs[currentSongIndex].src} ref={audioRef} controls autoPlay/>
      
 

      <div className="controls" style={{display:"flex",justifyContent:"space-between",
    padding:"2%"}}>
        <button className='button-91' style={{display:"flex"}} 
        onClick={()=>playPrevSong()}><GiPreviousButton/></button>
        <button className='play-btn' onClick={togglePlayPause}>  {isPlaying ? <FaPause/> : <FaPlay/>}</button>
      
        <button className='button-91'  onClick={()=>playNextSong()}><GiNextButton/></button>
      </div>
    </motion.div>
  );
};

export default GameMusicPlayer;
