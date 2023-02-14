import React, { useState } from 'react';
import Draggable from 'react-draggable';
import '../style/left_container.css'
const Buttom_multiple = ({ onCardDrop }) => {
    return (
      <div className='question_type'>        
      <Draggable onStop={onCardDrop}>          
      <div className='discriptive'> MCQ</div>        
      </Draggable>      </div>    );
  };
export default Buttom_multiple ;