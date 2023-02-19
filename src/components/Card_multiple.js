import React, { useState } from 'react';
import '../style/card_multipel.css';

const Card_multiple = ({ id, DataHandler }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [allMultiple, setAllMultiple] = useState({})

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOptionAdd = () => {
    setOptions([...options, { value: "", checked: false }]);
  };

  const handleOptionChange = (index, event) => {
    const updatedOptions = [...options];
    updatedOptions[index].value = event.target.value;
    setOptions(updatedOptions);
  };

  const handleOptionCheck = (index) => {
    const updatedOptions = [...options];
    updatedOptions[index].checked = !updatedOptions[index].checked;
    setOptions(updatedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };



  const getData = () => {

    const set = {
      id: `checkBox_id${id}`,
      questionText: question,
      options: options,
      type: "checkbox"
    }

    //setAllMultiple(set);

    DataHandler(set)

  }


  return (
    <>
      <div className='mcq_container'>
        <label>
          Question:
          <input className='discription_question_1' type="text" value={question} onChange={handleQuestionChange} placeholder="Question please" />
        </label>
        <br />
        <br />
        {options.map((option, index) => (
          <div key={index}>
            <label>
              <div>
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => handleOptionCheck(index)}
                />
                {option.value}
              </div>
            </label>
            <br />

            <label>
              Option {index + 1}:
              <input
                type="text"
                value={option.value}
                onChange={(event) => handleOptionChange(index, event)}
              />
            </label>
          </div>
        ))}
        <br />
        <br />
        <div className='mcq_buttons'>
          <button className='mcq_add' type="button" onClick={handleOptionAdd}>
            Add Option
          </button>
          <br />

          <button className='mcq_add' type="submit" onClick={getData}>Save option</button>
        </div>
      </div>
    </>
  );
};

export default Card_multiple;
