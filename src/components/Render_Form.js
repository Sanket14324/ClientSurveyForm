
// import React, { useEffect, useState } from "react";

// import {
//     Routes,
//     Route,
//     useSearchParams,
//     BrowserRouter,
//     useLocation
// } from "react-router-dom"
// import getFormById from './History'

// import "../style/createdForm.css"
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
//         updatedQuestions[index][e.target.name] = e.target.value;
//         console.log(e.target.value,"yuuuuuuu")
//         setQuestions(updatedQuestions);
//     };
//     const handleSubmit = (e) => {
//         const formData = questionAnswer.map((question) => {
//             return {
//               que: question.question,
//               ans: question.answer,
//             //   options: question.options,
//             //   selectedOption: question.selectedOption,
//             };
//           });
//           console.log(formData);
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
//             <h2>{formData.title}</h2>

//             <div className="sub-main">
//                 <form onSubmit={(e) => handleSubmit(e)}>
//                 {
//                     (() => {
//                         if (formData.questions !== undefined) {
//                             return formData.questions.map(
//                                 (question, index) => {
//                                     if (question.questionType === 'discriptive') {
//                                         return (
//                                             <div className="question" key={index}>
//                                                 <p className="questiontext" name="que"
//                                                 value={questionAnswer.question}
//                                                 onChange={(e) => onChange(e, index)}
//                                                 >{question.questionText}</p>

//                                                 <input className="answer" name="ans" type="text" value={questionAnswer.answer} 
//                                                 onChange={(e) => onChange(e, index)}
//                                                 />
//                                             </div>
//                                         )
//                                     }
//                                     if (question.questionType === 'radio') {

//                                         return (
//                                             <div className="question" key={index}>
//                                                 <p className="questiont" >{question.questionText}</p>
//                                                 {console.log(question.option[0])}
//                                                 {question.option.map((choice, index) => (

//                                                     <div className="options" key={index}>
//                                                         <input type="radio" id={choice} name={question.question} value={choice.name} />
//                                                         <label className="options-text" htmlFor={choice}>{choice.name}</label>
//                                                     </div>

//                                                 ))}

//                                             </div>

//                                         )

//                                     }

//                                     if (question.type === 'checkbox') {
//                                         return (
//                                             <div className="question" key={index}>
//                                                 <p>{question.questionText}</p>
//                                                 {question.options.map((choice, index) => (
//                                                     <div className="options" key={index}>
//                                                         <input type="checkbox" id={choice} name={question.question} value={choice.value} />
//                                                         <label className="options-text" htmlFor={choice}>{choice.value}</label>
//                                                     </div>

//                                                 ))}
//                                             </div>
//                                         )
//                                     }
//                                     else {
//                                         return <p> new question type</p>
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

//             </form>
//             </div>
//             <button type="submit" onClick={handleSubmit}>Submit</button>



//         </div>

//     )





// }




// export default Render_Form;














import React, { useEffect, useState } from "react";

import {
    Routes,
    Route,
    useSearchParams,
    BrowserRouter,
    useLocation
} from "react-router-dom"
import getFormById from './History'

//import "../style/createdForm.css"
const Render_Form = () => {
    const [formData, setUserData] = useState([]);
    const location = useLocation()
    const [queryParameters] = useSearchParams()
    const dataId = queryParameters.get("id")
  //  const questionTemplate = {que:"", ans:""};

    const [questionAnswer, setQuestions] = useState([]);

    // const onChange = (e, index) => {
    //     const updatedFormData = questionAnswer.map((question, i) =>
    //         index == i ?
    //         Object.assign(question, {[e.target.answer]:e.target.value})
    //         :question
        
    //     );
    //     setQuestions(updatedFormData);
    // }
    const handleChange = (e, index) => {
        const updatedQuestions = [...questionAnswer];
        updatedQuestions[index][e.target.name] = e.target.value;
        setQuestions(updatedQuestions);
      };
    const handleSubmit = (e) => {
        // const formData = questionAnswer.map((question) => {
        //     return {
        //       que: question.question,
        //       ans: question.answer,
        //     //   options: question.options,
        //     //   selectedOption: question.selectedOption,
        //     };
        //   });
        //   console.log(formData);
        // console.log(questionAnswer,"why");
        console.log(questionAnswer,"okkkkkk")
    };
    
   
    const getForm = async () => {

        try {

            const res = await fetch(`/api/form/getforms/` + dataId, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })

            const data = await res.json()
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
                {
                    (() => {
                        if (formData.questions !== undefined) {
                            return formData.questions.map(
                                (question, index) => {
                                    if (question.questionType === 'discriptive') {
                                        return (
                                            <div className="question" key={index}>
                                                <p className="questiontext" 
                                                   name="question"
                                                  
                                                   value={questionAnswer.question}
                                                   onChange={(e) => handleChange(e, index)}
                                                >
                                                {question.questionText}</p>

                                                <input className="answer" name="answer" type="text" value={questionAnswer.answer} 
                                                onChange={(e) => handleChange(e, index)}
                                                />
                                            </div>
                                        )
                                    }
                                    if (question.questionType === 'radio') {

                                        return (
                                            <div className="question" key={index}>
                                                <p className="questiont" >{question.questionText}</p>
                                                {console.log(question.option[0])}
                                                {question.option.map((choice, index) => (

                                                    <div className="options" key={index}>
                                                        <input type="radio" id={choice} name={question.question} value={choice.name} />
                                                        <label className="options-text" htmlFor={choice}>{choice.name}</label>
                                                    </div>

                                                ))}

                                            </div>

                                        )

                                    }

                                    if (question.type === 'checkbox') {
                                        return (
                                            <div className="question" key={index}>
                                                <p>{question.questionText}</p>
                                                {question.options.map((choice, index) => (
                                                    <div className="options" key={index}>
                                                        <input type="checkbox" id={choice} name={question.question} value={choice.value} />
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




