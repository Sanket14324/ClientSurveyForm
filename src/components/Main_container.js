import React, { useState,Component }  from 'react'
import '../style/main_container.css'
import Button_discription from './Button_discription';
import Right_container from './Right_container';
import Button_radio from './Button_radio';
import Card_discriptive from './Card_discriptive';
import Card_radio from './Card_radio';
import Navbar from './Navbar';
import Card_multiple from './Card_multiple';
import Button_multipel from './Button_multiple';
const userId = localStorage.getItem("UserId");








// console.log(userId);
const Main_container = () =>{



const [data,setData] = useState([])
console.log("alllllldata",data)



const DataHandler= (Data) =>{
  setData([...data,Data])
}



const [allFormData,setAllFormData] = useState({})   //allFormData contains the all the data



const FormTitle = async(Title) =>{
  
  console.log("hooooooo")
  console.log(Title)
  // console.log(localStorage.getItem("UserId"));
  const allData={
    userId : localStorage.getItem("UserId"),
    title:Title,
    structureData:data
  }
  
 setAllFormData(allData)
}



const [cards, setCards] = useState([]);




const PostData=(e)=>{
  
 e.preventDefault()
  
 {FormTitle()}
  
  console.log("happy",allFormData)
  fetch('/api/form/forms/'+userId, {
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
  }

  const handleCardDrop = () => {
    console.log("gooo")
    
    setCards([...cards,  <Card_discriptive DataHandler={DataHandler}/>]);
  };
  
  const handleRadioDrop =()=>{
    setCards([...cards, <Card_radio  DataHandler={DataHandler}/>])
  }
  
  const handleMultipleDrop =() =>{
    setCards([...cards, <Card_multiple  DataHandler={DataHandler}/>])
  }

// const handleCardDelete = (index) => {
//   console.log("whyyyyy")
//   setCards(cards.filter((_, i) => i !== index));
// };









const handleDragOver=(e)=>{
  e.preventDefault();
}

const handleDrop=(e)=>{
  console.log("dropped")
  console.log(e.dataTransfer.getData('id'))

  const id=e.dataTransfer.getData('id')

  if(id==='discriptive'){
      setCards([...cards,<Card_discriptive/>])
  }else if(id=='radio'){
    setCards([...cards,<Card_radio/>])
  }else if(id=='mcq'){
    setCards([...cards,<Card_multiple/>])
  }

}

return (
    <>
    <Navbar/>
    <div className='App'>
      <div className='container left'>
      <div className='question_type'>
      <div >
      <Button_discription  onCardDrop={handleCardDrop} />
      </div>
      <div>
      <Button_radio  className='discriptive' onCardDrop={handleRadioDrop} />
      </div>
      <div>
      <Button_multipel  className='discriptive' onCardDrop={handleMultipleDrop} />
      </div>
      </div>
      </div>
      <div className='container right'>
      <div className="droppable" onDrop={(e)=>{handleDrop(e)}} onDragOver={handleDragOver}>
                   ..
                </div>
      

                <div style={{ width: '80%', display:'block'}}> 
      <Right_container cards={cards} FormTitle={FormTitle}/>
      <br/>
      <br/>
      
      <ul style={{ textAlign: 'center',  display: 'block'  }}>
        {
          cards.map((Card, index) => {
           return <li>{Card}</li>
        })

        }
      </ul>
      </div>
      <div>
      <input type="submit" className="form_data_all" name="form_data" value="Submit Form" id="all_data" onClick={PostData}/>
      </div>


      {/* <ul>
        {
          cards.map((Card, index) => {
           return <li>{Card}</li>
        })

        }
      </ul> */}

      {/* <div className="droppable" onDrop={(e)=>{handleDrop(e)}} onDragOver={handleDragOver}>
                   drrr
                </div> */}

      </div>
    </div>
    </>
  );

 }

 export default Main_container;
            

  





