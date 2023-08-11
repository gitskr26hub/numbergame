
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import './Game.css'; // Create a separate CSS file for styling
import './App.css'; // Create a separate CSS file for styling
import Swal from 'sweetalert2';
import successSound from "./MP3/success.mp3";
import FailSound from "./MP3/fail.mp3";
import buttonSound from './MP3/button2.mp3';
import { motion } from 'framer-motion';

const Game = () => {

  const gamedata = JSON.parse(sessionStorage.getItem("Gamedifficullty"));
  const [list, setList] = useState([...gamedata?.arr]);
  const navigate = useNavigate();
  const [time, setTime] = useState(gamedata?.timing);
  const [rightarr, setRightarr] = useState(sortArray(gamedata?.arr));

  const bottomEl = useRef(null);

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // console.log(rightarr,list)
  useEffect(() => {
    scrollToBottom()
  }, [])



  useEffect(() => {
    
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      let c = 0
      for (let i = 0; i < rightarr.length; i++) {
        if (rightarr[i] === list[i]) c++
      }
      if (c === rightarr.length) {
        //   for won 
        new Audio(successSound).play()  
        setList([])
        setRightarr([])
        // setTimeout(() => {
         
           
        //    alert("❤️❤️❤️Congratulations❤️❤️❤️ You won the game")
         
        //   sessionStorage.removeItem("Gamedifficullty")
         
         
        //     navigate('/')
         
        // }, 1000)

           
        Swal.fire({
          title: '❤️❤️❤️Congratulations❤️❤️❤️ You won the game',
          confirmButtonColor: 'red',
         }).then((result) => {
          if (result.isConfirmed) {
           
            sessionStorage.removeItem("Gamedifficullty")
            navigate('/')
          }
        })
      }
  

      return () => {
        clearInterval(timer);
      };
    }

   

    if (time === 0) {
    
      // alert("Sorry 😞..!You Loose..!Please try Again😊😊😊😊😊😊")
      new Audio(FailSound).play()
     
      //  loose
      Swal.fire({
        title: 'Sorry 😞..!You Loose..!',
        text: "Please try Again😊😊😊😊😊😊",
       
        
        confirmButtonColor: 'red',
       
       
      }).then((result) => {
        if (result.isConfirmed) {
          setList([])
          setRightarr([])
          sessionStorage.removeItem("Gamedifficullty")
          navigate('/')
        }
      })
    
      
      
     
    }

  }, [time]);


  const onDragEnd = (result) => {
    // Handle the drag and drop operation here
    if (!result.destination) {
      return;
    }

    const reorderedList = Array.from(list);
    const [removed] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, removed);

    setList(reorderedList);
  };

  return (
    <div >
      <div style={{ width: "90%", margin: "auto" }}>
        <div className='colorkaro' style={{ margin: "auto", marginBottom: "1%" }}>
          <button onClick={() => { navigate('/'), new Audio(buttonSound).play() }} className='button-64'>
            <span className="text">Restart Game</span>
          </button>
          <h3 >Arrange Numbers Incresing Order (top to bottom) </h3>
          <h1 style={{ color: "blue" }}>Countdown Timer :
            <span
              style={{
                color: "red", backgroundColor: "blue",
                borderRadius: "5px", padding: "1%"
              }}>{time}</span></h1>
        </div>
      </div>

      <motion.div
        //  initial={{ opacity: 1, y: '100vh' }}
        //     animate={{ opacity: 1, y: 0 }}
        //      transition={{ duration: 1, ease: 'easeInOut' }}
        ref={bottomEl}
        className='wrap-drop'
        style={{ margin: "auto" }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div className="number-list" ref={provided.innerRef} {...provided.droppableProps} >
                {list.map((item, index) => (
                  <Draggable key={index} draggableId={`item-${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="number-item numbers"
                      >
                        <span style={{ color: "white" }}>
                          {index + 1}</span>{` -  `}{item}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </motion.div>
    </div>
  );
}

export default Game;




const sortArray = (arr) => {
  return [...arr].sort((a, b) => a - b);
};
