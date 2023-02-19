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
      const id=e.dataTransfer.getData('id')

      if(id==='radio'){
          setComponents([...components,<Card_radio/>])
      }

  }

  const handleDragStart=(ev,id)=>{
      ev.dataTransfer.setData('id',id)
  }


    return (
      
      <div className='question_type' onDragOver={(e)=>{handleDragOver(e)}} onDrop={(e)=>{handleDrop(e)}}>
        
                   
                    <div className='discriptive' draggable onDragStart={(e)=>{handleDragStart(e,"radio")}}> Radio</div>

               
      </div>
    );
  };

export default Button_radio;