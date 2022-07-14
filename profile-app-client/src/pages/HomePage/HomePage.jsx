import React from 'react'
import './HomePage.css';
import { Link } from 'react-router-dom';
const HomePage = () => {


  return (
    <div className="background-color"> 
    
    {/* Could the following code be chnged to card component */}
    
    <div className="container">
        <div className='divider-left '>
            <h1>Iron Profile </h1>
            <p>Today we will create an app with authoritation, adding some cool styles!</p>
            <div className='buttons'>
                <Link className='green-button' to="/api/auth/signup">Sign up</Link>
                <Link className='green-button' to="/api/auth/login"> Log in</Link>
            </div>


        </div>
        <div className='divider-right'>

        </div>
        {/* <Card /> */}
    </div> 
    </div>
  )
}

export default HomePage