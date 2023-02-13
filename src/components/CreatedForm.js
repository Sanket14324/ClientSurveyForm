
import React, { useEffect, useState } from "react";
import getFormById from './History'
import  {useLocation} from "react-router-dom";
import "../style/createdForm.css"
const CreatedForm = () => {
    const [formData, setUserData] = useState([]);
    const location=useLocation()
    const Submit = async () => {
        const res = await fetch('')
    }
    const getForm = async () => {
     
      // const IdSend= (Data) =>{
      //   const temp = Data;
      //   console.log("debhjf",temp);
      // }

      console.log("habeye",location.state.id)

        try {
            const res = await fetch(`/api/form/getforms/${location.state.id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })

            const data = await res.json()
            setUserData(data)

            //       //setUserData({...userData,name:data.name})         

            if (!res.status === 200) {

                const error = new Error(res.error)
                throw error
            }
        } catch (err) {
            console.log(err)   
        }
    }
    useEffect(() => {
        getForm();
    }, [])

    return (
        <div className="main">
            <h2>{formData.title}</h2>
            
            <div className="sub-main">     
            {
                (() => {
                    if(formData.questions !== undefined) {
                    return        formData.questions.map(
                                (question, index )=> {
                                  console.log(question.questionType)
                                  console.log(question.questionText)
                                    if(question.questionType === 'discriptive'){
                                        return (
                                            <div class="question" key={index}>              
                                            <p class="questiontext">{question.questionText}</p>              
                                            <input class="answer" type="text" value={question.answer} />           
                                        </div>
                                        )
                                    }
                                    if(question.questionType === 'radio'){

                                        return(
                                            <div class="question" key={index}>
                                            <p class="questiont" >{question.questionText}</p> 
                                           { console.log(question.option[0])}
                                            {question.option.map((choice, index) => ( 
                                              
                                                <div class="options" key={index}>           
                                                <input type="radio" id={choice} name={question.question} value={choice.name} />           
                                                <label  class="options-text" htmlFor={choice}>{choice.name}</label>               
                                                </div>
                                                
                                            ))}

                                            </div>
                                            
                                            )
                                    
                                    }
                                    else{
                                        return <p> new question type</p>
                                    }
                                }
                            )
                            
                            
                        }  else {
                            return (
                                <p>There is no such form</p>
                            )
                        }
                })()  
            }  

            
        </div>  
        {/* <button onClick={}>Submit</button> */}
                
                    

            </div>

    )

    


}




export default CreatedForm;



