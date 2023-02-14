import React, { useState ,useEffect} from 'react';
import '../style/right_container.css';
import Draggable from 'react-draggable';
import Card from './Card_discriptive';


const RightContainer = ({ cards,FormTitle})=> {

    const [title, setTitle] = useState("");
  
    let value;
    const handleChange = (event) => {
     // console.log(event.target.value)
      value = event.target.value;
      setTitle(event.target.value);
      console.log("wow");
      console.log(title);
     // FormTitle(title);
    };
   
    const onSave = () =>{
      setTitle(value);
      FormTitle(title);
    }

  return (

    
    
    <div style={{ width: "80%", float: "right" }}>


    <div style={{ width: '80%'}}>
    <p style={{ textAlign: 'center' }}>
        <h6>
        <input className='input_field_title' type="text" value={title} placeholder="Form Title" onChange={handleChange} />
        <button className="title_add" onClick={onSave}>
        save Option
        </button>
        
        </h6>
     
    </p>
      
    </div>


      {/* <ul>
        {
          cards.map((Card, index) => {
           return <li>{Card}</li>
        })

        }
      </ul>
       */}
    </div>
  );
}

export default RightContainer;