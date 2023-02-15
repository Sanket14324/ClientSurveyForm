
import React, { useEffect, useState } from "react";
import {
    Routes,
    Route,
    useSearchParams,
    BrowserRouter,
    useLocation
} from "react-router-dom"
import getFormById from './History'
import "../style/createdForm.css"
const Render_Form = () => {
    const [formData, setUserData] = useState([]);
    const location = useLocation()
    const [queryParameters] = useSearchParams()
    const dataId = queryParameters.get("id")

    const [ans,setAns]=useState([]);
   
    const [questionAnswer, setQuestions] = useState([]);
   
    const [radioQuestion,setRadioQuestion] = useState([])
    const [mcqQuestion,setMcqQuestion] = useState([])

    const [email,setEmail] = useState("");
   

    const onChange = (e, index) => {
        console.log(index)
        const updatedQuestions = [...questionAnswer];
         updatedQuestions[index] = {question:formData.questions[index].questionText,answer:e.target.value};
        console.log(e.target.value,"yuuuuuuu",formData.questions[index].questionText)
        setQuestions(updatedQuestions);
    };
    const onChangeRadio = (e) => {

       console.log(e.target.id)

        var i=formData.questions.findIndex((obj)=> obj.id===e.target.id)

        formData.questions[i].ans=e.target.value
         
        
       
    };

    const onChangeMcq = (e, index) => {
        console.log(index)
        const updatedQuestions = [...mcqQuestion];
         updatedQuestions[index] = {mcqQuestion:formData.questions[index].questionText,mcqAnswer:[e.target.value]};
        console.log(e.target.value,"mcqqqqq",formData.questions[index].questionText)
        setMcqQuestion(updatedQuestions);
        console.log(mcqQuestion,"mmmmmm")
    };
    


    const handleSubmit = (e) => {
      
      const allResponses ={
        email:email,
        responses:formData,
        
      }

      

       //setUserData(formData.email=email)
     formData.email=email;
      console.log(formData.email,"uuuuuuu")
      
      console.log("resp :",formData);

    };

    const handleEmail = (e) =>{
        setEmail(e.target.value)
         console.log(e.target.value,"email")

    }


    const getForm = async () => {
        try {
            const res = await fetch(`/api/form/getforms/` + dataId, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            console.log("form data:",data)
            
            setUserData(data)
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
                <form onSubmit={(e) => handleSubmit(e)}>
                    <p>email</p>
                    <input type="email" name="email" value={formData.email} 
        onChange={handleEmail} placeholder="enter email" required ></input>
                {
                    (() => {
                        if (formData.questions !== undefined) {
                            return formData.questions.map(
                                (question, index) => {
                                    {/* {console.log("q here:",question)} */}

                                    if (question.questionType === 'discriptive') {
                                        return (
                                            <div className="question" key={index}>
                                                <p className="questiontext" name="que"
                                                value={questionAnswer.question}
                                                >{question.questionText}</p>
                                                <input className="answer" id={question.id} name="ans" type="text" value={questionAnswer.answer} 
                                                onChange={(e) => onChangeRadio(e)}
                                                />
                                            </div>
                                        )
                                    }
                                    if (question.questionType === 'radio') {
                                        return (
                                            <div className="question" key={index}>
                                                <p className="questiont" value={radioQuestion.radioQuestion} >{question.questionText}</p>
                                                {console.log("question.option",question.option)}
                                                {question.option.map((choice, index1) => {
                                                    return(
                                                    <div className="options" key={index1}>
                                                        <input type="radio" id={question.id} name={question.id} key={question.id}  value={choice.name} 
                                                             onChange={(e) => onChangeRadio(e)}
                                                        />
                                                        <label className="options-text" htmlFor={choice}>{choice.name}</label>
                                                    </div>
                                                    )
                                                })
                                                }
                                            </div>
                                        )
                                    }
                                    if (question.type === 'checkbox') {
                                        return (
                                            <div className="question" key={index}>
                                                <p value={mcqQuestion.mcqQuestion}>{question.questionText}</p>
                                                {question.options.map((choice, index) => (
                                                    <div className="options" key={index}>
                                                        <input type="checkbox" id={question.id} name={question.question} value={choice.value} 
                                                            onChange={(e) => onChangeRadio(e)}
                                                        />
                                                        <label className="options-text" htmlFor={choice}>{choice.value}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    }
                                    else {
                                        return <p> new question type</p>
                                    }
                                }
                            )
                        } else {
                            return (
                                <p>There is no such form</p>
                            )
                        }
                    })()
                }
            </form>
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}
export default Render_Form;








// import React, { useEffect, useState } from "react";

// import {
//     Routes,
//     Route,
//     useSearchParams,
//     BrowserRouter,
//     useLocation
// } from "react-router-dom"
// import getFormById from './History'

// import "../style/render.css";
// const Render_Form = () => {
//     const [formData, setUserData] = useState([]);
//     const location = useLocation()
//     const [queryParameters] = useSearchParams()
//     const dataId = queryParameters.get("id")
//     const questionTemplate = {que:"", ans:""};

//     const [questionAnswer, setQuestions] = useState([questionTemplate]);

//     // const onChange = (e, index) => {
//     //     const updatedFormData = questionAnswer.map((question, i) =>
//     //         index == i ?
//     //         Object.assign(question, {[e.target.answer]:e.target.value})
//     //         :question
        
//     //     );
//     //     setQuestions(updatedFormData);
//     // }
//     const onChange = (e, index) => {
//         console.log(index)
//         const updatedQuestions = [...questionAnswer];
//          updatedQuestions[index] = {question:formData.questions[index].questionText,answer:e.target.value};
//         console.log(e.target.value,"yuuuuuuu",formData.questions[index].questionText)
//         setQuestions(updatedQuestions);
//     };
//     const handleSubmit = (e) => {
//         const formData = questionAnswer.map((question) => {
//             return {
//               email:e.target.email,  
//               que: question.question,
//             //   ans: question.ans,
//             //   options: question.options,
//             //   selectedOption: question.selectedOption,
//             };
//           });
//         //   console.log(formData);
//         console.log(questionAnswer,"why");
//     };
    
   
//     const getForm = async () => {

//         try {

//             const res = await fetch(`/api/form/getforms/` + dataId, {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             })

//             const data = await res.json()
//             setUserData(data)

//             if (!res.status === 200) {

//                 const error = new Error(res.error)
//                 throw error
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         getForm();
//     }, [])

//     return (
//         <div className="main">
//             <h2 className="formtitle">{formData.title}</h2>

//             <div className="register">
//                 <form onSubmit={(e) => handleSubmit(e)} id="register">
//                     <label className="textquestion">email</label>
//                     <input id="name" type="email" name="email" value={formData.email} 
//         placeholder="Enter email" required ></input>
//                 {
//                     (() => {
//                         if (formData.questions !== undefined) {
//                             return formData.questions.map(
//                                 (question, index) => {
//                                     if (question.questionType === 'discriptive') {
//                                         return (
//                                             <div key={index}>
//                                                 <label className="questiontext" name="que"
//                                                 value={questionAnswer.question}
//                                                 >{question.questionText}</label>

//                                                 <input id="name" className="text" name="ans" type="text" value={questionAnswer.answer} 
//                                                 onChange={(e) => onChange(e, index)}
//                                                 />
//                                                 <br></br>
//                                             </div>
//                                         )
//                                     }
//                                     if (question.questionType === 'radio') {

//                                         return (
//                                             <div key={index}>
//                                                 <label className="radiotext" >{question.questionText}:</label>

//                                                 {question.option.map((choice, index) => (

//                                                     <div className="options" key={index}>
//                                                         <input classname="radio" type="radio" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.name}>{choice.name}</span>
//                                                         {/* <label className="options-text" htmlFor={choice.name}>{choice.name}</label> */}
//                                                     </div>

//                                                 ))}

//                                             </div>

//                                         )

//                                     }

//                                     if (question.type === 'checkbox') {
//                                         return (
//                                             <div className="checkboxque" key={index}>
//                                                 <label className="box">{question.questionText}</label>

//                                                 {question.options.map((choice, index) => (
//                                                     <div className="checkboxoptions" key={index}>
//                                                         <input  type="checkbox" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.value}>{choice.value}</span>
//                                                         {/* <label className="options-text" htmlFor={choice}>{choice.value}</label> */}
//                                                     </div>

//                                                 ))}
//                                             </div>
//                                         )
//                                     }
//                                     else {
//                                         return <p classname="newquestion"> new question type</p>
//                                     }
//                                 }
//                             )


//                         } else {
//                             return (
//                                 <p>There is no such form</p>
//                             )
//                         }
//                     })()
//                 }

//         <button name="submit" type="submit" id="submit" value="submit" onClick={handleSubmit}>Submit</button>

//             </form>
//             </div>
            



//         </div>

//     )





// }




// export default Render_Form;








//////// hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii






// import React, { useEffect, useState } from "react";

// import {
//     Routes,
//     Route,
//     useSearchParams,
//     BrowserRouter,
//     useLocation
// } from "react-router-dom"
// import getFormById from './History'

// import "../style/render.css";
// const Render_Form = () => {
//     const [formData, setUserData] = useState([]);
//     const location = useLocation()
//     const [queryParameters] = useSearchParams()
//     const dataId = queryParameters.get("id")
//     const questionTemplate = {que:"", ans:""};

//     const [questionAnswer, setQuestions] = useState([questionTemplate]);

//     // const onChange = (e, index) => {
//     //     const updatedFormData = questionAnswer.map((question, i) =>
//     //         index == i ?
//     //         Object.assign(question, {[e.target.answer]:e.target.value})
//     //         :question
        
//     //     );
//     //     setQuestions(updatedFormData);
//     // }
//     const onChange = (e, index) => {
//         console.log(index)
//         const updatedQuestions = [...questionAnswer];
//          updatedQuestions[index] = {question:formData.questions[index].questionText,answer:e.target.value};
//         console.log(e.target.value,"yuuuuuuu",formData.questions[index].questionText)
//         setQuestions(updatedQuestions);
//     };
//     const handleSubmit = (e) => {
//         const formData = questionAnswer.map((question) => {
//             return {
//               email:e.target.email,  
//               que: question.question,
//             //   ans: question.ans,
//             //   options: question.options,
//             //   selectedOption: question.selectedOption,
//             };
//           });
//         //   console.log(formData);
//         console.log(questionAnswer,"why");
//     };
    
   
//     const getForm = async () => {

//         try {

//             const res = await fetch(`/api/form/getforms/` + dataId, {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             })

//             const data = await res.json()
//             setUserData(data)

//             if (!res.status === 200) {

//                 const error = new Error(res.error)
//                 throw error
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         getForm();
//     }, [])

//     return (
//         <div className="main">
//             <h2 className="formtitle">{formData.title}</h2>

//             <div className="register">
//                 <form onSubmit={(e) => handleSubmit(e)} id="register">
//                     <label className="textquestion">email</label>
//                     <input id="name" type="email" name="email" value={formData.email} 
//         placeholder="Enter email" required ></input>
//                 {
//                     (() => {
//                         if (formData.questions !== undefined) {
//                             return formData.questions.map(
//                                 (question, index) => {
//                                     if (question.questionType === 'discriptive') {
//                                         return (
//                                             <div key={index}>
//                                                 <label className="questiontext" name="que"
//                                                 value={questionAnswer.question}
//                                                 >{question.questionText}</label>

//                                                 <input id="name" className="text" name="ans" type="text" value={questionAnswer.answer} 
//                                                 onChange={(e) => onChange(e, index)}
//                                                 />
//                                                 <br></br>
//                                             </div>
//                                         )
//                                     }
//                                     if (question.questionType === 'radio') {

//                                         return (
//                                             <div key={index}>
//                                                 <label className="radiotext" >{question.questionText}:</label>

//                                                 {question.option.map((choice, index) => (

//                                                     <div className="options" key={index}>
//                                                         <input classname="radio" type="radio" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.name}>{choice.name}</span>
//                                                         {/* <label className="options-text" htmlFor={choice.name}>{choice.name}</label> */}
//                                                     </div>

//                                                 ))}

//                                             </div>

//                                         )

//                                     }

//                                     if (question.type === 'checkbox') {
//                                         return (
//                                             <div className="checkboxque" key={index}>
//                                                 <label className="box">{question.questionText}</label>

//                                                 {question.options.map((choice, index) => (
//                                                     <div className="checkboxoptions" key={index}>
//                                                         <input  type="checkbox" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.value}>{choice.value}</span>
//                                                         {/* <label className="options-text" htmlFor={choice}>{choice.value}</label> */}
//                                                     </div>

//                                                 ))}
//                                             </div>
//                                         )
//                                     }
//                                     else {
//                                         return <p classname="newquestion"> new question type</p>
//                                     }
//                                 }
//                             )


//                         } else {
//                             return (
//                                 <p>There is no such form</p>
//                             )
//                         }
//                     })()
//                 }

//         <button name="submit" type="submit" id="submit" value="submit" onClick={handleSubmit}>Submit</button>

//             </form>
//             </div>
            



//         </div>

//     )





// }




// export default Render_Form;




// import React, { useEffect, useState } from "react";

// import {
//     Routes,
//     Route,
//     useSearchParams,
//     BrowserRouter,
//     useLocation
// } from "react-router-dom"
// import getFormById from './History'

// import "../style/render.css";
// const Render_Form = () => {
//     const [formData, setUserData] = useState([]);
//     const location = useLocation()
//     const [queryParameters] = useSearchParams()
//     const dataId = queryParameters.get("id")
//     const questionTemplate = {que:"", ans:""};

//     const [questionAnswer, setQuestions] = useState([questionTemplate]);

//     // const onChange = (e, index) => {
//     //     const updatedFormData = questionAnswer.map((question, i) =>
//     //         index == i ?
//     //         Object.assign(question, {[e.target.answer]:e.target.value})
//     //         :question
        
//     //     );
//     //     setQuestions(updatedFormData);
//     // }
//     const onChange = (e, index) => {
//         console.log(index)
//         const updatedQuestions = [...questionAnswer];
//          updatedQuestions[index] = {question:formData.questions[index].questionText,answer:e.target.value};
//         console.log(e.target.value,"yuuuuuuu",formData.questions[index].questionText)
//         setQuestions(updatedQuestions);
//     };
//     const handleSubmit = (e) => {
//         const formData = questionAnswer.map((question) => {
//             return {
//               email:e.target.email,  
//               que: question.question,
//             //   ans: question.ans,
//             //   options: question.options,
//             //   selectedOption: question.selectedOption,
//             };
//           });
//         //   console.log(formData);
//         console.log(questionAnswer,"why");
//     };
    
   
//     const getForm = async () => {

//         try {

//             const res = await fetch(`/api/form/getforms/` + dataId, {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             })

//             const data = await res.json()
//             setUserData(data)

//             if (!res.status === 200) {

//                 const error = new Error(res.error)
//                 throw error
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         getForm();
//     }, [])

//     return (
//         <div className="main">
//             <h2 className="formtitle">{formData.title}</h2>

//             <div className="register">
//                 <form onSubmit={(e) => handleSubmit(e)} id="register">
//                     <label className="textquestion">email</label>
//                     <input id="name" type="email" name="email" value={formData.email} 
//         placeholder="Enter email" required ></input>
//                 {
//                     (() => {
//                         if (formData.questions !== undefined) {
//                             return formData.questions.map(
//                                 (question, index) => {
//                                     if (question.questionType === 'discriptive') {
//                                         return (
//                                             <div key={index}>
//                                                 <label className="questiontext" name="que"
//                                                 value={questionAnswer.question}
//                                                 >{question.questionText}</label>

//                                                 <input id="name" className="text" name="ans" type="text" value={questionAnswer.answer} 
//                                                 onChange={(e) => onChange(e, index)}
//                                                 />
//                                                 <br></br>
//                                             </div>
//                                         )
//                                     }
//                                     if (question.questionType === 'radio') {

//                                         return (
//                                             <div key={index}>
//                                                 <label className="radiotext" >{question.questionText}:</label>

//                                                 {question.option.map((choice, index) => (

//                                                     <div className="options" key={index}>
//                                                         <input classname="radio" type="radio" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.name}>{choice.name}</span>
//                                                         {/* <label className="options-text" htmlFor={choice.name}>{choice.name}</label> */}
//                                                     </div>

//                                                 ))}

//                                             </div>

//                                         )

//                                     }

//                                     if (question.type === 'checkbox') {
//                                         return (
//                                             <div className="checkboxque" key={index}>
//                                                 <label className="box">{question.questionText}</label>

//                                                 {question.options.map((choice, index) => (
//                                                     <div className="checkboxoptions" key={index}>
//                                                         <input  type="checkbox" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.value}>{choice.value}</span>
//                                                         {/* <label className="options-text" htmlFor={choice}>{choice.value}</label> */}
//                                                     </div>

//                                                 ))}
//                                             </div>
//                                         )
//                                     }
//                                     else {
//                                         return <p classname="newquestion"> new question type</p>
//                                     }
//                                 }
//                             )


//                         } else {
//                             return (
//                                 <p>There is no such form</p>
//                             )
//                         }
//                     })()
//                 }

//         <button name="submit" type="submit" id="submit" value="submit" onClick={handleSubmit}>Submit</button>

//             </form>
//             </div>
            



//         </div>

//     )





// }




// export default Render_Form;

// import React, { useEffect, useState } from "react";

// import {
//     Routes,
//     Route,
//     useSearchParams,
//     BrowserRouter,
//     useLocation
// } from "react-router-dom"
// import getFormById from './History'

// import "../style/render.css";
// const Render_Form = () => {
//     const [formData, setUserData] = useState([]);
//     const location = useLocation()
//     const [queryParameters] = useSearchParams()
//     const dataId = queryParameters.get("id")
//     const questionTemplate = {que:"", ans:""};

//     const [questionAnswer, setQuestions] = useState([questionTemplate]);

//     // const onChange = (e, index) => {
//     //     const updatedFormData = questionAnswer.map((question, i) =>
//     //         index == i ?
//     //         Object.assign(question, {[e.target.answer]:e.target.value})
//     //         :question
        
//     //     );
//     //     setQuestions(updatedFormData);
//     // }
//     const onChange = (e, index) => {
//         console.log(index)
//         const updatedQuestions = [...questionAnswer];
//          updatedQuestions[index] = {question:formData.questions[index].questionText,answer:e.target.value};
//         console.log(e.target.value,"yuuuuuuu",formData.questions[index].questionText)
//         setQuestions(updatedQuestions);
//     };
//     const handleSubmit = (e) => {
//         const formData = questionAnswer.map((question) => {
//             return {
//               email:e.target.email,  
//               que: question.question,
//             //   ans: question.ans,
//             //   options: question.options,
//             //   selectedOption: question.selectedOption,
//             };
//           });
//         //   console.log(formData);
//         console.log(questionAnswer,"why");
//     };
    
   
//     const getForm = async () => {

//         try {

//             const res = await fetch(`/api/form/getforms/` + dataId, {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             })

//             const data = await res.json()
//             setUserData(data)

//             if (!res.status === 200) {

//                 const error = new Error(res.error)
//                 throw error
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         getForm();
//     }, [])

//     return (
//         <div className="main">
//             <h2 className="formtitle">{formData.title}</h2>

//             <div className="register">
//                 <form onSubmit={(e) => handleSubmit(e)} id="register">
//                     <label className="textquestion">email</label>
//                     <input id="name" type="email" name="email" value={formData.email} 
//         placeholder="Enter email" required ></input>
//                 {
//                     (() => {
//                         if (formData.questions !== undefined) {
//                             return formData.questions.map(
//                                 (question, index) => {
//                                     if (question.questionType === 'discriptive') {
//                                         return (
//                                             <div key={index}>
//                                                 <label className="questiontext" name="que"
//                                                 value={questionAnswer.question}
//                                                 >{question.questionText}</label>

//                                                 <input id="name" className="text" name="ans" type="text" value={questionAnswer.answer} 
//                                                 onChange={(e) => onChange(e, index)}
//                                                 />
//                                                 <br></br>
//                                             </div>
//                                         )
//                                     }
//                                     if (question.questionType === 'radio') {

//                                         return (
//                                             <div key={index}>
//                                                 <label className="radiotext" >{question.questionText}:</label>

//                                                 {question.option.map((choice, index) => (

//                                                     <div className="options" key={index}>
//                                                         <input classname="radio" type="radio" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.name}>{choice.name}</span>
//                                                         {/* <label className="options-text" htmlFor={choice.name}>{choice.name}</label> */}
//                                                     </div>

//                                                 ))}

//                                             </div>

//                                         )

//                                     }

//                                     if (question.type === 'checkbox') {
//                                         return (
//                                             <div className="checkboxque" key={index}>
//                                                 <label className="box">{question.questionText}</label>

//                                                 {question.options.map((choice, index) => (
//                                                     <div className="checkboxoptions" key={index}>
//                                                         <input  type="checkbox" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.value}>{choice.value}</span>
//                                                         {/* <label className="options-text" htmlFor={choice}>{choice.value}</label> */}
//                                                     </div>

//                                                 ))}
//                                             </div>
//                                         )
//                                     }
//                                     else {
//                                         return <p classname="newquestion"> new question type</p>
//                                     }
//                                 }
//                             )


//                         } else {
//                             return (
//                                 <p>There is no such form</p>
//                             )
//                         }
//                     })()
//                 }

//         <button name="submit" type="submit" id="submit" value="submit" onClick={handleSubmit}>Submit</button>

//             </form>
//             </div>
            



//         </div>

//     )





// }




// export default Render_Form;




// import React, { useEffect, useState } from "react";

// import {
//     Routes,
//     Route,
//     useSearchParams,
//     BrowserRouter,
//     useLocation
// } from "react-router-dom"
// import getFormById from './History'

// import "../style/render.css";
// const Render_Form = () => {
//     const [formData, setUserData] = useState([]);
//     const location = useLocation()
//     const [queryParameters] = useSearchParams()
//     const dataId = queryParameters.get("id")
//     const questionTemplate = {que:"", ans:""};

//     const [questionAnswer, setQuestions] = useState([questionTemplate]);

//     // const onChange = (e, index) => {
//     //     const updatedFormData = questionAnswer.map((question, i) =>
//     //         index == i ?
//     //         Object.assign(question, {[e.target.answer]:e.target.value})
//     //         :question
        
//     //     );
//     //     setQuestions(updatedFormData);
//     // }
//     const onChange = (e, index) => {
//         console.log(index)
//         const updatedQuestions = [...questionAnswer];
//          updatedQuestions[index] = {question:formData.questions[index].questionText,answer:e.target.value};
//         console.log(e.target.value,"yuuuuuuu",formData.questions[index].questionText)
//         setQuestions(updatedQuestions);
//     };
//     const handleSubmit = (e) => {
//         const formData = questionAnswer.map((question) => {
//             return {
//               email:e.target.email,  
//               que: question.question,
//             //   ans: question.ans,
//             //   options: question.options,
//             //   selectedOption: question.selectedOption,
//             };
//           });
//         //   console.log(formData);
//         console.log(questionAnswer,"why");
//     };
    
   
//     const getForm = async () => {

//         try {

//             const res = await fetch(`/api/form/getforms/` + dataId, {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             })

//             const data = await res.json()
//             setUserData(data)

//             if (!res.status === 200) {

//                 const error = new Error(res.error)
//                 throw error
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         getForm();
//     }, [])

//     return (
//         <div className="main">
//             <h2 className="formtitle">{formData.title}</h2>

//             <div className="register">
//                 <form onSubmit={(e) => handleSubmit(e)} id="register">
//                     <label className="textquestion">email</label>
//                     <input id="name" type="email" name="email" value={formData.email} 
//         placeholder="Enter email" required ></input>
//                 {
//                     (() => {
//                         if (formData.questions !== undefined) {
//                             return formData.questions.map(
//                                 (question, index) => {
//                                     if (question.questionType === 'discriptive') {
//                                         return (
//                                             <div key={index}>
//                                                 <label className="questiontext" name="que"
//                                                 value={questionAnswer.question}
//                                                 >{question.questionText}</label>

//                                                 <input id="name" className="text" name="ans" type="text" value={questionAnswer.answer} 
//                                                 onChange={(e) => onChange(e, index)}
//                                                 />
//                                                 <br></br>
//                                             </div>
//                                         )
//                                     }
//                                     if (question.questionType === 'radio') {

//                                         return (
//                                             <div key={index}>
//                                                 <label className="radiotext" >{question.questionText}:</label>

//                                                 {question.option.map((choice, index) => (

//                                                     <div className="options" key={index}>
//                                                         <input classname="radio" type="radio" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.name}>{choice.name}</span>
//                                                         {/* <label className="options-text" htmlFor={choice.name}>{choice.name}</label> */}
//                                                     </div>

//                                                 ))}

//                                             </div>

//                                         )

//                                     }

//                                     if (question.type === 'checkbox') {
//                                         return (
//                                             <div className="checkboxque" key={index}>
//                                                 <label className="box">{question.questionText}</label>

//                                                 {question.options.map((choice, index) => (
//                                                     <div className="checkboxoptions" key={index}>
//                                                         <input  type="checkbox" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.value}>{choice.value}</span>
//                                                         {/* <label className="options-text" htmlFor={choice}>{choice.value}</label> */}
//                                                     </div>

//                                                 ))}
//                                             </div>
//                                         )
//                                     }
//                                     else {
//                                         return <p classname="newquestion"> new question type</p>
//                                     }
//                                 }
//                             )


//                         } else {
//                             return (
//                                 <p>There is no such form</p>
//                             )
//                         }
//                     })()
//                 }

//         <button name="submit" type="submit" id="submit" value="submit" onClick={handleSubmit}>Submit</button>

//             </form>
//             </div>
            



//         </div>

//     )





// }




// export default Render_Form;




// import React, { useEffect, useState } from "react";

// import {
//     Routes,
//     Route,
//     useSearchParams,
//     BrowserRouter,
//     useLocation
// } from "react-router-dom"
// import getFormById from './History'

// import "../style/render.css";
// const Render_Form = () => {
//     const [formData, setUserData] = useState([]);
//     const location = useLocation()
//     const [queryParameters] = useSearchParams()
//     const dataId = queryParameters.get("id")
//     const questionTemplate = {que:"", ans:""};

//     const [questionAnswer, setQuestions] = useState([questionTemplate]);

//     // const onChange = (e, index) => {
//     //     const updatedFormData = questionAnswer.map((question, i) =>
//     //         index == i ?
//     //         Object.assign(question, {[e.target.answer]:e.target.value})
//     //         :question
        
//     //     );
//     //     setQuestions(updatedFormData);
//     // }
//     const onChange = (e, index) => {
//         console.log(index)
//         const updatedQuestions = [...questionAnswer];
//          updatedQuestions[index] = {question:formData.questions[index].questionText,answer:e.target.value};
//         console.log(e.target.value,"yuuuuuuu",formData.questions[index].questionText)
//         setQuestions(updatedQuestions);
//     };
//     const handleSubmit = (e) => {
//         const formData = questionAnswer.map((question) => {
//             return {
//               email:e.target.email,  
//               que: question.question,
//             //   ans: question.ans,
//             //   options: question.options,
//             //   selectedOption: question.selectedOption,
//             };
//           });
//         //   console.log(formData);
//         console.log(questionAnswer,"why");
//     };
    
   
//     const getForm = async () => {

//         try {

//             const res = await fetch(`/api/form/getforms/` + dataId, {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             })

//             const data = await res.json()
//             setUserData(data)

//             if (!res.status === 200) {

//                 const error = new Error(res.error)
//                 throw error
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         getForm();
//     }, [])

//     return (
//         <div className="main">
//             <h2 className="formtitle">{formData.title}</h2>

//             <div className="register">
//                 <form onSubmit={(e) => handleSubmit(e)} id="register">
//                     <label className="textquestion">email</label>
//                     <input id="name" type="email" name="email" value={formData.email} 
//         placeholder="Enter email" required ></input>
//                 {
//                     (() => {
//                         if (formData.questions !== undefined) {
//                             return formData.questions.map(
//                                 (question, index) => {
//                                     if (question.questionType === 'discriptive') {
//                                         return (
//                                             <div key={index}>
//                                                 <label className="questiontext" name="que"
//                                                 value={questionAnswer.question}
//                                                 >{question.questionText}</label>

//                                                 <input id="name" className="text" name="ans" type="text" value={questionAnswer.answer} 
//                                                 onChange={(e) => onChange(e, index)}
//                                                 />
//                                                 <br></br>
//                                             </div>
//                                         )
//                                     }
//                                     if (question.questionType === 'radio') {

//                                         return (
//                                             <div key={index}>
//                                                 <label className="radiotext" >{question.questionText}:</label>

//                                                 {question.option.map((choice, index) => (

//                                                     <div className="options" key={index}>
//                                                         <input classname="radio" type="radio" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.name}>{choice.name}</span>
//                                                         {/* <label className="options-text" htmlFor={choice.name}>{choice.name}</label> */}
//                                                     </div>

//                                                 ))}

//                                             </div>

//                                         )

//                                     }

//                                     if (question.type === 'checkbox') {
//                                         return (
//                                             <div className="checkboxque" key={index}>
//                                                 <label className="box">{question.questionText}</label>

//                                                 {question.options.map((choice, index) => (
//                                                     <div className="checkboxoptions" key={index}>
//                                                         <input  type="checkbox" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.value}>{choice.value}</span>
//                                                         {/* <label className="options-text" htmlFor={choice}>{choice.value}</label> */}
//                                                     </div>

//                                                 ))}
//                                             </div>
//                                         )
//                                     }
//                                     else {
//                                         return <p classname="newquestion"> new question type</p>
//                                     }
//                                 }
//                             )


//                         } else {
//                             return (
//                                 <p>There is no such form</p>
//                             )
//                         }
//                     })()
//                 }

//         <button name="submit" type="submit" id="submit" value="submit" onClick={handleSubmit}>Submit</button>

//             </form>
//             </div>
            



//         </div>

//     )





// }




// export default Render_Form;




// import React, { useEffect, useState } from "react";

// import {
//     Routes,
//     Route,
//     useSearchParams,
//     BrowserRouter,
//     useLocation
// } from "react-router-dom"
// import getFormById from './History'

// import "../style/render.css";
// const Render_Form = () => {
//     const [formData, setUserData] = useState([]);
//     const location = useLocation()
//     const [queryParameters] = useSearchParams()
//     const dataId = queryParameters.get("id")
//     const questionTemplate = {que:"", ans:""};

//     const [questionAnswer, setQuestions] = useState([questionTemplate]);

//     // const onChange = (e, index) => {
//     //     const updatedFormData = questionAnswer.map((question, i) =>
//     //         index == i ?
//     //         Object.assign(question, {[e.target.answer]:e.target.value})
//     //         :question
        
//     //     );
//     //     setQuestions(updatedFormData);
//     // }
//     const onChange = (e, index) => {
//         console.log(index)
//         const updatedQuestions = [...questionAnswer];
//          updatedQuestions[index] = {question:formData.questions[index].questionText,answer:e.target.value};
//         console.log(e.target.value,"yuuuuuuu",formData.questions[index].questionText)
//         setQuestions(updatedQuestions);
//     };
//     const handleSubmit = (e) => {
//         const formData = questionAnswer.map((question) => {
//             return {
//               email:e.target.email,  
//               que: question.question,
//             //   ans: question.ans,
//             //   options: question.options,
//             //   selectedOption: question.selectedOption,
//             };
//           });
//         //   console.log(formData);
//         console.log(questionAnswer,"why");
//     };
    
   
//     const getForm = async () => {

//         try {

//             const res = await fetch(`/api/form/getforms/` + dataId, {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             })

//             const data = await res.json()
//             setUserData(data)

//             if (!res.status === 200) {

//                 const error = new Error(res.error)
//                 throw error
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         getForm();
//     }, [])

//     return (
//         <div className="main">
//             <h2 className="formtitle">{formData.title}</h2>

//             <div className="register">
//                 <form onSubmit={(e) => handleSubmit(e)} id="register">
//                     <label className="textquestion">email</label>
//                     <input id="name" type="email" name="email" value={formData.email} 
//         placeholder="Enter email" required ></input>
//                 {
//                     (() => {
//                         if (formData.questions !== undefined) {
//                             return formData.questions.map(
//                                 (question, index) => {
//                                     if (question.questionType === 'discriptive') {
//                                         return (
//                                             <div key={index}>
//                                                 <label className="questiontext" name="que"
//                                                 value={questionAnswer.question}
//                                                 >{question.questionText}</label>

//                                                 <input id="name" className="text" name="ans" type="text" value={questionAnswer.answer} 
//                                                 onChange={(e) => onChange(e, index)}
//                                                 />
//                                                 <br></br>
//                                             </div>
//                                         )
//                                     }
//                                     if (question.questionType === 'radio') {

//                                         return (
//                                             <div key={index}>
//                                                 <label className="radiotext" >{question.questionText}:</label>

//                                                 {question.option.map((choice, index) => (

//                                                     <div className="options" key={index}>
//                                                         <input classname="radio" type="radio" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.name}>{choice.name}</span>
//                                                         {/* <label className="options-text" htmlFor={choice.name}>{choice.name}</label> */}
//                                                     </div>

//                                                 ))}

//                                             </div>

//                                         )

//                                     }

//                                     if (question.type === 'checkbox') {
//                                         return (
//                                             <div className="checkboxque" key={index}>
//                                                 <label className="box">{question.questionText}</label>

//                                                 {question.options.map((choice, index) => (
//                                                     <div className="checkboxoptions" key={index}>
//                                                         <input  type="checkbox" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.value}>{choice.value}</span>
//                                                         {/* <label className="options-text" htmlFor={choice}>{choice.value}</label> */}
//                                                     </div>

//                                                 ))}
//                                             </div>
//                                         )
//                                     }
//                                     else {
//                                         return <p classname="newquestion"> new question type</p>
//                                     }
//                                 }
//                             )


//                         } else {
//                             return (
//                                 <p>There is no such form</p>
//                             )
//                         }
//                     })()
//                 }

//         <button name="submit" type="submit" id="submit" value="submit" onClick={handleSubmit}>Submit</button>

//             </form>
//             </div>
            



//         </div>

//     )





// }




// export default Render_Form;




// import React, { useEffect, useState } from "react";

// import {
//     Routes,
//     Route,
//     useSearchParams,
//     BrowserRouter,
//     useLocation
// } from "react-router-dom"
// import getFormById from './History'

// import "../style/render.css";
// const Render_Form = () => {
//     const [formData, setUserData] = useState([]);
//     const location = useLocation()
//     const [queryParameters] = useSearchParams()
//     const dataId = queryParameters.get("id")
//     const questionTemplate = {que:"", ans:""};

//     const [questionAnswer, setQuestions] = useState([questionTemplate]);

//     // const onChange = (e, index) => {
//     //     const updatedFormData = questionAnswer.map((question, i) =>
//     //         index == i ?
//     //         Object.assign(question, {[e.target.answer]:e.target.value})
//     //         :question
        
//     //     );
//     //     setQuestions(updatedFormData);
//     // }
//     const onChange = (e, index) => {
//         console.log(index)
//         const updatedQuestions = [...questionAnswer];
//          updatedQuestions[index] = {question:formData.questions[index].questionText,answer:e.target.value};
//         console.log(e.target.value,"yuuuuuuu",formData.questions[index].questionText)
//         setQuestions(updatedQuestions);
//     };
//     const handleSubmit = (e) => {
//         const formData = questionAnswer.map((question) => {
//             return {
//               email:e.target.email,  
//               que: question.question,
//             //   ans: question.ans,
//             //   options: question.options,
//             //   selectedOption: question.selectedOption,
//             };
//           });
//         //   console.log(formData);
//         console.log(questionAnswer,"why");
//     };
    
   
//     const getForm = async () => {

//         try {

//             const res = await fetch(`/api/form/getforms/` + dataId, {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             })

//             const data = await res.json()
//             setUserData(data)

//             if (!res.status === 200) {

//                 const error = new Error(res.error)
//                 throw error
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         getForm();
//     }, [])

//     return (
//         <div className="main">
//             <h2 className="formtitle">{formData.title}</h2>

//             <div className="register">
//                 <form onSubmit={(e) => handleSubmit(e)} id="register">
//                     <label className="textquestion">email</label>
//                     <input id="name" type="email" name="email" value={formData.email} 
//         placeholder="Enter email" required ></input>
//                 {
//                     (() => {
//                         if (formData.questions !== undefined) {
//                             return formData.questions.map(
//                                 (question, index) => {
//                                     if (question.questionType === 'discriptive') {
//                                         return (
//                                             <div key={index}>
//                                                 <label className="questiontext" name="que"
//                                                 value={questionAnswer.question}
//                                                 >{question.questionText}</label>

//                                                 <input id="name" className="text" name="ans" type="text" value={questionAnswer.answer} 
//                                                 onChange={(e) => onChange(e, index)}
//                                                 />
//                                                 <br></br>
//                                             </div>
//                                         )
//                                     }
//                                     if (question.questionType === 'radio') {

//                                         return (
//                                             <div key={index}>
//                                                 <label className="radiotext" >{question.questionText}:</label>

//                                                 {question.option.map((choice, index) => (

//                                                     <div className="options" key={index}>
//                                                         <input classname="radio" type="radio" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.name}>{choice.name}</span>
//                                                         {/* <label className="options-text" htmlFor={choice.name}>{choice.name}</label> */}
//                                                     </div>

//                                                 ))}

//                                             </div>

//                                         )

//                                     }

//                                     if (question.type === 'checkbox') {
//                                         return (
//                                             <div className="checkboxque" key={index}>
//                                                 <label className="box">{question.questionText}</label>

//                                                 {question.options.map((choice, index) => (
//                                                     <div className="checkboxoptions" key={index}>
//                                                         <input  type="checkbox" id={choice.name} name={question.questionText} />
//                                                         &nbsp;
//                                                         <span id={choice.value}>{choice.value}</span>
//                                                         {/* <label className="options-text" htmlFor={choice}>{choice.value}</label> */}
//                                                     </div>

//                                                 ))}
//                                             </div>
//                                         )
//                                     }
//                                     else {
//                                         return <p classname="newquestion"> new question type</p>
//                                     }
//                                 }
//                             )


//                         } else {
//                             return (
//                                 <p>There is no such form</p>
//                             )
//                         }
//                     })()
//                 }

//         <button name="submit" type="submit" id="submit" value="submit" onClick={handleSubmit}>Submit</button>

//             </form>
//             </div>
            



//         </div>

//     )





// }




// export default Render_Form;












