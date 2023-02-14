import React, { useState } from 'react';
import Draggable from 'react-draggable';

import '../style/left_container.css'
import Card_radio from './Card_radio';

const Button_radio = ({ onCardDrop }) => {


  const [components,setComponents]=useState([]);

  const handleDragOver=(e)=>{
      e.preventDefault();
  }

  const handleDrop=(e)=>{
      console.log("dropped")
      console.log(e.dataTransfer.getData('id'))

      const id=e.dataTransfer.getData('id')

      if(id==='radio'){
          setComponents([...components,<Card_radio/>])
      }

  }

  const handleDragStart=(ev,id)=>{
      ev.dataTransfer.setData('id',id)
  }


    return (
      // <div className='question_type'>
      //   <Draggable onStop={onCardDrop}>
      //     <div className='discriptive'> Radio</div>
      //   </Draggable>
      // </div>


      <div className='question_type' onDragOver={(e)=>{handleDragOver(e)}} onDrop={(e)=>{handleDrop(e)}}>
        
                   
                    <div className='discriptive' draggable onDragStart={(e)=>{handleDragStart(e,"radio")}}> Radio</div>
                    {/* <button draggable onDragStart={(e)=>{handleDragStart(e,"button-b")}}> button -b</button> */}

               
      </div>
    );
  };

export default Button_radio;