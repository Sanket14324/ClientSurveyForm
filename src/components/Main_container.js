import React, { useState, Component } from 'react'
import '../style/main_container.css'
import Button_discription from './Button_discription';
import Right_container from './Right_container';
import Button_radio from './Button_radio';
import Card_discriptive from './Card_discriptive';
import Card_radio from './Card_radio';
import Navbar from './Navbar';
import Card_multiple from './Card_multiple';
import Button_multipel from './Button_multiple';
import { useNavigate } from 'react-router-dom'
import { compose } from '@mui/system';
const userId = localStorage.getItem("UserId");

var radioCount = 0;
var discriptiveCount = 0;
var checkBoxCount = 0;

const Main_container = () => {
  const navigate = useNavigate()

  const [data, setData] = useState([])
  console.log("alllllldata", data)



  const DataHandler = (Data) => {
    setData([...data, Data])
  }

  const [allFormData, setAllFormData] = useState({})   //allFormData contains the all the data

  const FormTitle = async (Title) => {

    console.log("hooooooo")
    console.log(Title)
    // console.log(localStorage.getItem("UserId"));
    const allData = {
      userId: localStorage.getItem("UserId"),
      title: Title,
      structureData: data
    }

    setAllFormData(allData)
  }

  const [cards, setCards] = useState([]);

  const PostData = (e) => {

    e.preventDefault()

    { FormTitle() }

    console.log("happy", allFormData)
    fetch('/api/form/forms/' + userId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', allFormData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    navigate("/history")
  }


  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    console.log("dropped")
    console.log(e.dataTransfer.getData('id'))

    const id = e.dataTransfer.getData('id')

    if (id === 'discriptive') {
      setCards([...cards, <Card_discriptive id={discriptiveCount} DataHandler={DataHandler} />])
      discriptiveCount = discriptiveCount + 1
    } else if (id == 'radio') {
      console.log("radio :")
      console.log(radioCount)
      setCards([...cards, <Card_radio id={radioCount} DataHandler={DataHandler} />]);
      radioCount = radioCount + 1
    } else if (id == 'mcq') {
      setCards([...cards, <Card_multiple id={checkBoxCount} DataHandler={DataHandler} />])
      checkBoxCount = checkBoxCount + 1
    }

  }

  return (
    <>
      <Navbar />
      <div className='App'>
        <div className='container left'>
          <div className='question_type'>
            <div >
              <Button_discription />
            </div>
            <div>
              <Button_radio className='discriptive' />
            </div>
            <div>
              <Button_multipel className='discriptive' />
            </div>
          </div>
        </div>
        <div className='container right'>
          <div className="droppable" onDrop={(e) => { handleDrop(e) }} onDragOver={handleDragOver}>
            ....
          </div>


          <div style={{ width: '80%', display: 'block' }}>
            <Right_container cards={cards} FormTitle={FormTitle} />
            <br />
            <br />

            <ul style={{ textAlign: 'center', display: 'block' }}>
              {
                cards.map((Card, index) => {
                  return <li>{Card}</li>
                })

              }
            </ul>
          </div>
          <div>
            <input type="submit" className="form_data_all" name="form_data" value="Submit Form" id="all_data" onClick={PostData} />
          </div>
        </div>
      </div>
    </>
  );

}

export default Main_container;








