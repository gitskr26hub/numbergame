// import React, {  useEffect, useRef, useState } from 'react'
// import Swal from 'sweetalert2'

// import './App.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// //mp3 downlaod
// import successSound from "./MP3/success.mp3"
// import FailSound from "./MP3/fail.mp3"

// import buttonSound from './MP3/button2.mp3'

// const Game = () => {

// const gamedata= JSON.parse(sessionStorage.getItem("Gamedifficullty"))

// console.log(gamedata)

//     const dragItem = useRef();
//     const dragOverItem = useRef();
//     const [list, setList] = useState([...gamedata?.arr]);
//     const navigate=useNavigate()
//     const [time, setTime] = useState(gamedata?.timing);

//     const [rightarr,setRightarr]=useState(sortArray(gamedata?.arr))

//     const bottomEl = useRef(null);

//     const scrollToBottom = () => {
//       bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     // console.log(rightarr,list)
//     useEffect(()=>{
//     scrollToBottom()
//     },[])


//     const dragStart = (e, position) => {
//       dragItem.current = position;
//       // console.log(e.target.innerHTML);
//     };

//     // const dragEnter = (e, position) => {  
//     //   dragOverItem.current = position;
//     //   // console.log(e.target.innerHTML);
//     // };

//     const drop = (e,index) => {
//       console.log(e,index)

//       const copyListItems = Array.from(list);

//       const dragItemContent = copyListItems[dragItem.current];

//       copyListItems.splice(dragItem.current, 1);
//       copyListItems.splice(dragOverItem.current, 0, dragItemContent);
//       dragItem.current = null;
//       dragOverItem.current = null;
//       setList(copyListItems);
//     };




//   useEffect(() => {
//     if (time > 0) {
//       const timer = setInterval(() => {
//         setTime(prevTime => prevTime - 1);
//       }, 1000);

//       var c=0
//       for(let i=0;i<rightarr.length;i++){
//         if(rightarr[i]===list[i])c++
//       }
//       if(c==rightarr.length){
//         // for won 
//         new Audio(successSound).play()
//         setTimeout(()=>{ setList([])
//         setRightarr([])
//         Swal.fire({
//           title: '❤️❤️❤️Congratulations❤️❤️❤️ You won the game',

//           padding: '1em',
//           color: '#716add',
//           // background: '#fff url("./Images/won.gif")',
//           background: ("./Images/won.gif"),
//           backdrop: `
//             rgba(0,0,123,0.4)
//             url("./Images/won.gif")
//             left top
//             no-repeat
//           `
//         })
//         sessionStorage.removeItem("Gamedifficullty")


//           navigate('/')
//         },1000)
//         }

//       return () => {
//         clearInterval(timer);
//       };
//     }
//     if(time===0){

//       new Audio(FailSound).play()
//       // loose
//       Swal.fire('Sorry 😞..! You Loose..! Please try Again😊😊😊😊😊😊',)

//         setList([])
//         setRightarr([])
//         sessionStorage.removeItem("Gamedifficullty")

//           navigate('/')

//       }

//   }, [time]);




//     console.log("LIST",list)   
//     if(list?.length==0)navigate('/')



//   return (
//     <div >


//       <div  style={{width:"90%",margin:"auto"}}>
//         <div className='colorkaro' style={{margin:"auto",marginBottom:"1%"}}>
//           <button  onClick={()=>{navigate('/'),new Audio(buttonSound).play()}} className='button-64'>
//           <span className="text">Restart Game</span>
//             </button>
//         <h3 >Arrange Numbers Incresing Order (top to bottom) </h3>
//         <h1 style={{color:"blue"}}>Countdown Timer :
//         <span 
//         style={{color:"red",backgroundColor:"blue",
//         borderRadius:"5px",padding:"1%"}}>{time}</span></h1>
//         </div>

//       <div ref={bottomEl} style={{margin:"auto",alignItems:"center",touchAction:"none",
//     msTouchAction:"none"}}>
//       {   list && list?.map((item, index) => (

//       <motion.div className='numbers'

//           initial={{ opacity: 0, y: '100vh' }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: 'easeInOut' }}


//        whileHover={{ scale: 1.01,color:"blue",fontSize:"30px",fontStyle:"italic",
//       fontWeight:"bold"}} style={{margin:"auto",
//       marginTop:"0.5%",textAlign:'center', fontSize:'25px'}}
//         onTouchStart={(e) => dragStart(e, index)}
//         onDragEnter={(e) => dragEnter(e, index)}
//         onTouchEnd={(e)=>drop(e,index)}
//         key={index}
//         draggable>
//          {index+1}{`-`} {item}
//       </motion.div>

//       ))}

//       </div>

//       </div>

//     </div>
//   )
// }

// export default Game



// const sortArray = (arr) => {
//  return arr.sort((a,b)=>a-b)

// };


/////////////////////////////////////////////////////////////
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2';
import './Game.css'; // Create a separate CSS file for styling
import './App.css'; // Create a separate CSS file for styling
import successSound from "./MP3/success.mp3";
import FailSound from "./MP3/fail.mp3";
import buttonSound from './MP3/button2.mp3';

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
    useEffect(()=>{
    scrollToBottom()
    },[])

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      var c = 0
      for (let i = 0; i < rightarr.length; i++) {
        if (rightarr[i] === list[i]) c++
      }
      if (c == rightarr.length) {
        //   for won 
        new Audio(successSound).play()
        setTimeout(() => {
          setList([])
          setRightarr([])
          Swal.fire({
            title: '❤️❤️❤️Congratulations❤️❤️❤️ You won the game',

            padding: '1em',
            color: '#716add',
            background: '#fff url("./Images/won.gif")',
            background: ("./Images/won.gif"),
            backdrop: `
             rgba(0,0,123,0.4)
             url("./Images/won.gif")
             left top
             no-repeat
           `
          })
          sessionStorage.removeItem("Gamedifficullty")


          navigate('/')
        }, 1000)
      }

      return () => {
        clearInterval(timer);
      };
    }
    if (time === 0) {

      new Audio(FailSound).play()
      //  loose
      Swal.fire('Sorry 😞..! You Loose..! Please try Again😊😊😊😊😊😊',)

      setList([])
      setRightarr([])
      sessionStorage.removeItem("Gamedifficullty")

      navigate('/')

    }

  }, [time]);

  if (list.length === 0) {
    navigate('/');
  }

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

      <div ref={bottomEl} className='wrap-drop' style={{ color: "white", margin: "auto" }} 
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div className="number-list" ref={provided.innerRef} {...provided.droppableProps} >
                {list.map((item, index) => (
                  <Draggable  key={index} draggableId={`item-${index}`} index={index}>
                    {(provided) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="number-item numbers"
                      >
                       <span style={{color:"blueviolet"}}> 
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
      </div>
    </div>
  );
}

export default Game;




const sortArray = (arr) => {
  return [...arr].sort((a, b) => a - b);
};
