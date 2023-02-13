import React, { useState } from 'react';
import Draggable from 'react-draggable';

import '../style/left_container.css'

const Left_container_radio = ({ onCardDrop }) => {
    return (
      <div className='question_type'>
        <Draggable onStop={onCardDrop}>
          <div className='discriptive'> Radio</div>
        </Draggable>
      </div>
    );
  };

export default Left_container_radio;