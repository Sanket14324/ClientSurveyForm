import { JsonToTable } from "react-json-to-table";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/response.css"
import Navbar from "./Navbar";
var location;

const Responses = () => {
    location=useLocation()
    const [apiResponse, setApiResponse] = useState("***now loading ***");

    useEffect(() => {
        getResponse().then(
            
            result => {
                setApiResponse(result)
            }

        
        );
        
    }, []);
    return (

        <>
        <Navbar/>

        <div className="main">
            <h2>Responses</h2>
            <div className="response-table">
            <ol>{apiResponse}</ol>
            </div>
            {giveExportButton(apiResponse)}
        </div>
        </>

    );
}

const giveExportButton = (api) => {

    if( api.length === 0){

        return (
            <>
           
            <p> There is no response yet.</p>
            </>
        ) 
    }
    else{
        return (
            <>
            
            <button className="export-button" onClick={() => exportResponse()}>Export</button>
            </>
        )
    }
}
// to export the response
const exportResponse = async() => {
    
    try {
        const formId = location.state.id;
       window.open('http://localhost:5000/api/export/responses/'+formId)
    } catch (err) {
        console.log(err)   
    }
}
const getResponse = async () => {
    const response = await fetch(`/api/response/form/responses/${location.state.id}`);

    const jsonResponse = await response.json();

    const ArrayOfResponse = jsonResponse.map(
        
            responsearray => <div>

                                <li>
                                    
                                <div className="user-email">
                                    <div> Eamil - {responsearray.email}</div>
                                    <div>Timestamp - {responsearray.createdAt}</div>
                                </div>

                                <JsonToTable json={responsearray.responses}/>

                                </li>
                             
                                <hr></hr>
    
                            </div>
            
            
            )
        return ArrayOfResponse;

}

export default Responses;