
import React, { useEffect, useState } from "react";
import getFormById from './History'
import { useLocation } from "react-router-dom";
import "../style/createdForm.css"
import Navbar from "./Navbar";

const CreatedForm = () => {
    const [formData, setUserData] = useState([]);
    const location = useLocation()
    const Submit = async () => {
        const res = await fetch('')
    }
    const getForm = async () => {

        try {
            const res = await fetch(`/api/form/getforms/${location.state.id}`, {
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
        <>

            <Navbar />

            <div className="main">
                <h2>{formData.title}</h2>

                <div className="sub-main">
                    {
                        (() => {
                            if (formData.questions !== undefined) {
                                return formData.questions.map(
                                    (question, index) => {
                                        if (question.questionType === 'discriptive') {
                                            return (
                                                <div class="question" key={index}>
                                                    <p class="questiontext">{question.questionText}</p>
                                                    <input class="answer" type="text" value={question.answer} />
                                                </div>
                                            )
                                        }
                                        if (question.questionType === 'radio') {

                                            return (
                                                <div class="question" key={index}>
                                                    <p class="questiont" >{question.questionText}</p>

                                                    {question.option.map((choice, index) => (

                                                        <div class="options" key={index}>
                                                            <input type="radio" id={choice} name={question.question} value={choice.name} />
                                                            <label class="options-text" htmlFor={choice}>{choice.name}</label>
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

                                                        <div class="options" key={index}>
                                                            <input type="checkbox" id={choice} name={question.question} value={choice.value} />
                                                            <label class="options-text" htmlFor={choice}>{choice.value}</label>
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


                </div>
                


            </div>

        </>

    )




}




export default CreatedForm;



