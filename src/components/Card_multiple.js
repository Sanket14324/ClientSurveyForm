import React, { useState } from 'react';
const Card_multiple = ({DataHandler}) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [allMultiple,setAllMultiple] = useState({})
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };
  const handleOptionAdd = () => {
    setOptions([...options, {value: "", checked: false}]);
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
    console.log("Question:", question);
    console.log("Options:", options);
  };
const getData = () =>{
  const set ={
    questionText:question,
    options:options,
    type:"checkbox"  }
  //setAllMultiple(set);  console.log("yyyyy",set);
  DataHandler(set)
  console.log(question,"questiongggggg")
  console.log(options,"optionsssss")
}
  return (
    <form onSubmit={handleSubmit}>      <label>        Question:
        <input type="text" value={question} onChange={handleQuestionChange} />      </label>      <br />      <br />      {options.map((option, index) => (
        <div key={index}>          <label>            <input              type="checkbox"              checked={option.checked}
              onChange={() => handleOptionCheck(index)}
            />            {option.value}
          </label>          <br />          <label>            Option {index + 1}:
            <input              type="text"              value={option.value}
              onChange={(event) => handleOptionChange(index, event)}
            />          </label>        </div>      ))}
      <br />      <br />      <button type="button" onClick={handleOptionAdd}>        Add Option      </button>      <br />      <br />      <button type="submit" onClick={getData}>Save option</button>    </form>  );
};
export default Card_multiple;