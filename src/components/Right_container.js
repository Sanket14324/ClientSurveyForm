import React, { useState, useEffect } from 'react';
import '../style/right_container.css';



const RightContainer = ({ cards, FormTitle }) => {

  const [title, setTitle] = useState("");

  let value;
  const handleChange = (event) => {

    value = event.target.value;
    setTitle(event.target.value);


  };

  const onSave = () => {
    setTitle(value);
    FormTitle(title);
    window.alert("Questions Saved")
  }

  return (



    <div style={{ width: "80%", float: "right" }}>


      <div style={{ width: '80%' }}>
        <p style={{ textAlign: 'center' }}>
          <h6>
            <input className='input_field_title' type="text" value={title} placeholder="Form Title" onChange={handleChange} />
            <button className="title_add" onClick={onSave}>
              save Option
            </button>

          </h6>

        </p>

      </div>
    </div>
  );
}

export default RightContainer;