import React, { useState } from 'react';
import Draggable from 'react-draggable';
import '../style/card_discription.css'
import RightContainer from './Right_container';



const Card = ({ id, DataHandler }) => {

  const [discriptive, setdiscriptive] = useState({
    id: `discriptive_${id}`,
    questionText: "",
    questionType: "discriptive"
  })

  let name, value;
  const handleInputs = (e) => {

    name = e.target.name
    value = e.target.value
    setdiscriptive({ ...discriptive, [name]: value })

  }


  const onSave = () => {
    setdiscriptive({ ...discriptive, [name]: value })
    setdiscriptive({ ...discriptive, questionType: "discriptive" })

    DataHandler(discriptive)

  }


  return (
    <div className='discription_container'>
      <div className='discription_question'><label style={{ paddingLeft: "4.5rem", textAlign: "center" }}>Question :</label> <input className="discription_question_1" type="text" name="questionText"
        value={discriptive.question_text}
        id="question_text"
        onChange={handleInputs}
        placeholder="Question Please" /></div>


      <div className='discription_answer'><label>Answer :</label> <input className="discription_answer_1" type="text" name="answer_text"
        value={discriptive.answer_text}
        id="answer_text"
       
        placeholder="Answer Please" /></div>
      <button className="discriptive_add" onClick={onSave}>
        save Option
      </button>
    </div>
  );
};

export default Card;