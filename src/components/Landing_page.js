import React from 'react'
import '../style/landing_page.css';
import { useNavigate } from 'react-router-dom'

const Landing_page = () => {

    const navigate = useNavigate()

    const Login = () => {

        navigate("/login")
    }

    const SiginUp = () => {
        navigate("/register")
    }

    return (
        <>

            <section className="background-img">

                <div id="wrap">
                    <h1 className='landing_heading'>IO Forms</h1>
                    <p className='landing_dis'>Making Technology Simpler,Everyday</p>


                    <div>
                        <a className="btn-slide" href="#" >
                            <span className="title" onClick={SiginUp}>Sign Up</span>
                        </a>
                    </div>

                    <div>
                        <a className="btn-slide" href="#" >
                            <span className="title" onClick={Login}>Sign In</span>
                        </a>
                    </div>

                </div>

            </section>


        </>
    )
}

export default Landing_page