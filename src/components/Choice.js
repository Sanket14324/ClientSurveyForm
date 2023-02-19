import React from 'react'
import '../style/Choice.css'
import uuid from 'react-uuid'
import { useNavigate } from 'react-router-dom'

const Choice = () => {

    const navigate = useNavigate()

    const createForm = () => {
        const unique_id = uuid();
        navigate("/home")
    }

    return (
        <>
            <div className='body_choice'>
                <a href="/history" className="button">Already Created</a>
                <a href="#" className="button gray" id="gray" onClick={createForm}>Create New</a>
            </div>
        </>
    )
}

export default Choice