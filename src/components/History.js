
import Button from '@mui/material/Button';
import Navbar from "./Navbar";
import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../style/history.css"


var navigate
const userId = localStorage.getItem("UserId")
const History=()=>{ 
    const [apiResponse, setApiResponse] = useState("***now loading ***");
    navigate=useNavigate();
    useEffect(() => {
        getForm().then(
            result => setApiResponse(result)
        );
    }, []);
        return (
             
          <>
            <Navbar/>
            <div className="main">
                <h2>Archive</h2>
                <ul>{apiResponse}</ul>
            </div>
            </>
        );
}

console.log(userId)


const getForm = async () => {
   
    const response = await fetch('/api/user/alreadyExist/'+userId);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
   

    const arrayOfForms = jsonResponse.map(
        form => <div className="post grid-x grid-padding-x">
                    <div className="small-12 medium-10 medium-offset-1 cell pagination"> 
                        <a className="view-all">
                            <div className="link" onClick={() => getFormById(form._id)} key={form._id}>{form.title}</div>
                        </a>
                        <a className="prev">
                            <div className="link" onClick={() => getLinkForPublishById(form._id)}>Publish</div>
                        </a>
                        <a className="next">
                            <div className="link" onClick={() => goResponse(form._id)}>Responses</div>
                        </a>

                    </div>
                        <a className="middle">
                                <div className="link delete" onClick={() => deleteForm(form._id)}>Delete</div>
                        </a>
                        <hr></hr>
                </div>
    )


    return arrayOfForms;
}


const getFormById = async (formId) => {
  
    // IdSend(formId);
   
    console.log(formId);
    // const response = await fetch('/api/forms/'+formId);
    // const jsonResponse = await response.json();
    // console.log(jsonResponse);
    navigate(`/form`,{state: {id: formId}})
    
    // return jsonResponse;

}

const goResponse = async (formId) => {
  
    // IdSend(formId);
   
    console.log(formId);
    // const response = await fetch('/api/forms/'+formId);
    // const jsonResponse = await response.json();
    // console.log(jsonResponse);
    navigate(`/response`,{state: {id: formId}})
    
    // return jsonResponse;

}

const deleteForm = async (formId) => {

    // const response = await fetch('/api/form/deleteform/'+formId);
    const res = await fetch('/api/form/deleteform/'+formId, {
        method: "DELETE",
        // headers: { "Content-Type": "application/json" },
    })

    window.location.reload()
    alert("deleted successfully.")
    // navigate('/history')
}







const getLinkForPublishById = async (formId) => {

    alert( "http://localhost:3000/render/?id="+formId);

}

export default History;
export {getFormById};
