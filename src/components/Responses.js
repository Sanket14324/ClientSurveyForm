import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
var location;
const Responses = () => {
    location=useLocation()
    const [apiResponse, setApiResponse] = useState("***now loading ***");
    // const [data, setData] = useState([]);

    useEffect(() => {
        getResponse().then(
            
            result => {
                console.log(result)
                setApiResponse(result)
                
            }
            
        );
    }, []);

    // const response =  fetch('/submit/form/responses/63e4ea9dbac97ee0638c325d').then(res => res.json())
    // .then(response => {
    //   setData(response);
    // })

    // console.log(response.json());
    return (

        <div className="main">
            {
                console.log(apiResponse+" gaydugauyguwa")
            }
            <h2>Responses</h2>
            <ul>{apiResponse}</ul>
        </div>

    );
}

const getResponse = async () => {
    const response = await fetch(`/api/response/form/responses/63ea0f776a86c0462cd13c1f`);
    // const response = await fetch(`/api/response/forms/responses/'+ 63ea0f776a86c0462cd13c1f);${location.state.id}
    console.log(location.state.id);
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    const ArrayOfResponse = jsonResponse.map(
        
        responsearray => <div>
                        <div>{responsearray.email}</div>
            
                        <ol>{responsearray.responses.map(

                            element => <li>
                            
                                {element.question}
                                {element.answer}</li>
                         )}

                            </ol> 
                         <hr></hr>

                        </div>
        
        
        )
    return ArrayOfResponse;

}

// const getAnswer = async (responsearray) => {
    
//     return  responsearray.responses.map(
//         element =>
//         {
//             console.log(element.answer);
//             <p>{element.answer}</p>
//         }
//         );
// }



export default Responses;
