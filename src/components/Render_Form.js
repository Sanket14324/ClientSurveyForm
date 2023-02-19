import React, { useEffect, useState } from "react";
import {
    Routes,
    Route,
    useSearchParams,
    BrowserRouter,
    useLocation

} from "react-router-dom"

import "../style/render.css"
const Render_Form = () => {


    const [formData, setUserData] = useState([]);
    const location = useLocation()
    const [queryParameters] = useSearchParams()
    const dataId = queryParameters.get("id")



    const [questionAnswer, setQuestions] = useState([]);

    const [radioQuestion, setRadioQuestion] = useState([])
    const [mcqQuestion, setMcqQuestion] = useState([])

    const [email, setEmail] = useState("");

    const onChange = (e) => {
        var i = formData.questions.findIndex((obj) => obj.id === e.target.id)
        if (e.target.type === 'checkbox') {

            if (formData.questions[i].hasOwnProperty("ans")) {
                formData.questions[i].ans.push(e.target.value)
            } else {
                formData.questions[i].ans = [e.target.value];

            }

        }
        else {

            formData.questions[i].ans = e.target.value;

        }

    };


    // submitting the form
    const handleSubmit = async (e) => {
        //    const navigate = useNavigate();

        if (email === undefined || email === "" || email === null) {
            alert("Please enter the email")
        }
        else {
            formData.email = email;
            var respData;
            try {
                const res = await fetch('/api/response/forms/responses/' + dataId, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ formData })
                })

                if (res.status === 401) {

                    alert("Yor are not authorized to fill the form");

                }

                else if (res.status !== 200) {
                    console.log("internal server error ")
                }
                else {
                    respData = await res.text();
                }
            }
            catch (err) {
                throw err
            }
            if (respData === "Success") {
                alert("Response submitted successfully. \nThank you!!!")
            }
            window.location.reload()
        }

    };

    // set usestate of email
    const handleEmail = (e) => {

        setEmail(e.target.value)

    }


    // calling the api using form id to get the responses
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
        <div className="Rmain">
            <h2 className="Rtitle">{formData.title}</h2>
            <div className="Rsub-main">
                <form onSubmit={(e) => handleSubmit(e)}>

                    <input className="Rinput" type="email" name="email" value={formData.email}
                        onChange={handleEmail} placeholder="Enter email" required ></input>
                    <ol className="Rlist">
                        {
                            (() => {

                                if (formData.questions !== undefined) {
                                    return formData.questions.map(
                                        (question, index) => {

                                            // condition if the question is the type of text
                                            if (question.questionType === 'discriptive') {
                                                return (
                                                    <li>
                                                        <div className="Rquestion" key={index}>
                                                            <p className="questiontext" name="que"
                                                                value={questionAnswer.question}
                                                            >{question.questionText}</p>
                                                            <input className="RDinput" id={question.id} name="ans" type="text" value={questionAnswer.answer}
                                                                onChange={(e) => onChange(e)}
                                                            />
                                                        </div>
                                                    </li>
                                                )
                                            }

                                            // condition if the quuestion is the type of radio
                                            if (question.questionType === 'radio') {
                                                return (
                                                    <li>
                                                        <div className="Rquestion" key={index}>
                                                            <p className="questiontext" value={radioQuestion.radioQuestion} >{question.questionText}</p>

                                                            {question.option.map((choice, index1) => {
                                                                return (
                                                                    <div className="options" key={index1}>
                                                                        <input type="radio" id={question.id} name={question.id} key={question.id} value={choice.name}
                                                                            onChange={(e) => onChange(e)}
                                                                        />
                                                                        <label className="Roptiontext" htmlFor={choice}>{choice.name}</label>
                                                                    </div>
                                                                )
                                                            })
                                                            }
                                                        </div>
                                                    </li>
                                                )
                                            }

                                            // condition if the question is type of mcq checkbox
                                            if (question.type === 'checkbox') {
                                                return (
                                                    <li>
                                                        <div className="Rquestion" key={index}>
                                                            <p className="questiontext" value={mcqQuestion.mcqQuestion}>{question.questionText}</p>
                                                            {question.options.map((choice, index) => (
                                                                <div className="options" key={index}>
                                                                    <input type="checkbox" id={question.id} name={question.question} value={choice.value}
                                                                        onChange={(e) => onChange(e)}
                                                                    />
                                                                    <label className="Roptiontext" htmlFor={choice}>{choice.value}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </li>
                                                )
                                            }
                                            // if any other components we can add here
                                            else {
                                                return <p> new question type</p>
                                            }
                                        }
                                    )
                                } else {
                                    return (
                                        <p>There is no such form something wrong happened</p>
                                    )
                                }
                            })()
                        }
                    </ol>
                </form>
                <button className="Rbutton" type="submit" onClick={handleSubmit}>Submit</button>
            </div>

        </div>
    )
}
export default Render_Form;


