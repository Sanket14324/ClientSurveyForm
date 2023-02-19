import React, { useState } from "react";
import '../style/card_radio.css'

const Card_radio = ({ id, DataHandler }) => {


  const [options, setOptions] = useState(

    [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
    ],


  );


  const [selectedOption, setSelectedOption] = useState({
    id: "", name: "", question_text: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [editOptionId, setEditOptionId] = useState(null);


  const [question, setquestion] = useState({
    question_text: ""
  });


  let name, value;
  const handlequestion = (e) => {

    name = e.target.name
    value = e.target.value
    setquestion({ ...question, [name]: value })

  }


  const handleOptionChange = (option) => {

    const temp = {
      id: option.id,
      name: option.name,
      question_text: question.question_text
    }
    setSelectedOption(temp);

  };

  const handleAddOption = () => {

    setOptions([
      ...options,
      { id: options.length + 1, name: `Option ${options.length + 1}` }
    ]);

  };

  const handleEditOption = (option) => {

    setEditMode(true);
    setEditOptionId(option.id);

  };

  const handleSaveOption = (option) => {
    setOptions(
      options.map((existingOption) => {
        if (existingOption.id === option.id) {
          return option;
        }
        return existingOption;
      })
    );
    setEditMode(false);
  };




  const handleOption = () => {

    const allData = {
      id: `radio_${id}`,
      questionText: question.question_text,
      option: options,
      questionType: "radio"
    }


    DataHandler(allData)
    //all radio data

  };


  return (
    <div className="container_radio">
      <div className='discription_question'><label>Question :</label> <input className="discription_question_1" type="text" name="question_text"
        value={question.question_text}
        id="question_text"
        onChange={handlequestion}
        placeholder="Question Please" />
      </div>

      {options.map((option) => (
        <div key={option.id}>

          <input
            type="radio"
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
          />

          {editOptionId === option.id ? (
            <input
              className="radio_option"
              type="text"
              value={option.name}
              onChange={(event) =>
                handleSaveOption({ ...option, name: event.target.value })
              }
            />
          ) : (
            option.name
          )
          }

          {editOptionId !== option.id && (
            <button className="radio_edit" onClick={() => handleEditOption(option)}>Edit</button>
          )
          }

        </div>
      ))}

      <button className="radio_add" onClick={handleOption}>
        save Option
      </button>
      <button className="radio_add" onClick={handleAddOption} disabled={editMode}>
        Add Option
      </button>

    </div>
  );
};

export default Card_radio;