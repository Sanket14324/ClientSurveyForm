import React, { useState } from 'react';
import Draggable from 'react-draggable';

import '../style/left_container.css'
import Card_multiple from './Card_multiple';

const Button_multipel = ({ onCardDrop }) => {


  const [components,setComponents]=useState([]);

  const handleDragOver=(e)=>{
      e.preventDefault();
  }

  const handleDrop=(e)=>{
      
      const id=e.dataTransfer.getData('id')

      if(id==='mcq'){
          setComponents([...components,<Card_multiple/>])
      }

  }

  const handleDragStart=(ev,id)=>{
      ev.dataTransfer.setData('id',id)
  }



    return (

      <div className='question_type' onDragOver={(e)=>{handleDragOver(e)}} onDrop={(e)=>{handleDrop(e)}}>
        
                    <div className='discriptive' draggable onDragStart={(e)=>{handleDragStart(e,"mcq")}}>Check Box</div>
                                 
      </div>

    );
  };

export default Button_multipel;