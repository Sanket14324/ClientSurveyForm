import Button from '@mui/material/Button';
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../style/history.css"
var navigate;
const userId = localStorage.getItem("UserId")
const History = () => {
    const [apiResponse, setApiResponse] = useState("***now loading ***");
    navigate = useNavigate();
    useEffect(() => {
        getForm().then(
            result => setApiResponse(result)
        );
    }, []);
    return (
        <>
            <Navbar />
            <div className="main">
                <h2>Archive</h2>
                <ul>{apiResponse}</ul>
            </div>
        </>
    );
}

const getForm = async () => {
    const response = await fetch('/api/user/alreadyExist/' + userId);
    const jsonResponse = await response.json();
   
    const arrayOfForms = jsonResponse.map(
        form => <div className="post grid-x grid-padding-x">
            <div className="small-12 medium-10 medium-offset-1 cell pagination">
                <div className='pagination-form-titile'>
                    <a className="view-all">
                        <div className="link" onClick={() => getFormById(form._id)} key={form._id}>{form.title}</div>
                    </a>
                </div>
                <div className='pagination-form-button'>
                    <a className="prev">
                        <div className="link" onClick={() => getLinkForPublishById(form._id)}>Publish</div>
                    </a>
                    <a className="next">
                        <div className="link" onClick={() => goResponse(form._id)}>Responses</div>
                    </a>
                </div>
            </div>
            <div className='pagination-form-delete-button'>
                <a className="middle"><div className="delete" onClick={() => deleteForm(form._id)}>Delete</div>
                </a>
            </div>
        </div>)
    return arrayOfForms;
}
const getFormById = async (formId) => {   
    navigate(`/form`, { state: { id: formId } })   
}

const goResponse = async (formId) => {
  
    navigate(`/form/response`, { state: { id: formId } })
    
}
const deleteForm = async (formId) => {
      
    const res = await fetch('/api/form/deleteform/' + formId, {
        method: "DELETE",   
    })
    window.location.reload()
    alert("deleted successfully.")
}

const getLinkForPublishById = async (formId) => {
    alert("http://localhost:3000/render/?id=" + formId);
}

export default History;
export { getFormById };