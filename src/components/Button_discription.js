import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Left_container_radio from './Button_radio';
import '../style/left_container.css'

const LeftContainer = ({ onCardDrop }) => {
    return (
      <div className='question_type'>
        <Draggable onStop={onCardDrop}>
          <div className='discriptive'> Discriptive</div>
        </Draggable>
      </div>
    );
  };

export default LeftContainer;