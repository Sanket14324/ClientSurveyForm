import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/user/signout', {
            method: "GET",
            headers: {
                Accept: "applicaton/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            navigate("/")
            if (res.status != 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    })

    return (
        <>

        </>
    )
}

export default Logout