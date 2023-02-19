import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Left_container_radio from './Button_radio';
import '../style/left_container.css'
import Card_radio from './Card_radio';
import Card_discriptive from './Card_discriptive'

const Button_discription = ({ onCardDrop }) => {



  const [components, setComponents] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {

    const id = e.dataTransfer.getData('id')

    if (id === 'discriptive') {
      setComponents([...components, <Card_discriptive />])
    }

  }

  const handleDragStart = (ev, id) => {
    ev.dataTransfer.setData('id', id)
  }


  return (
    <>

      <div className='question_type' onDragOver={(e) => { handleDragOver(e) }} onDrop={(e) => { handleDrop(e) }}>

        <div className='discriptive' draggable onDragStart={(e) => { handleDragStart(e, "discriptive") }}> Discriptive</div>
       
      </div>

    </>
  );
};

export default Button_discription;