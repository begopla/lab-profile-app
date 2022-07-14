import React from 'react'

const Login = () => {
  return (
    <div className="background-color"> 
    
    {/* Could the following code be chnged to card component */}
    
    <div className="container">
        <div className='divider-left '>
            <h1>SignUp </h1>
            <form action="">
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" name='username' value="" />

                <label htmlFor="password">Password:</label>
                <input type="text" name='password' value="" />

                <label htmlFor="campus">Campus:</label>
                <input type="text" name='campus' value="" />

                <label htmlFor="course">Course:</label>
                <input type="text" name='course' value="" />

            </div>
            </form>
        </div>
        <div className='divider-right'>
        <h3>Hello!!</h3>
        <h4>Welcome to IronProfile!</h4>
        <p>If you signup, you agree with all our terms and conditions where we can do whatever we want with the data</p>
        <button>Create the Account</button>
        </div>
       
    </div> 
    </div>
  )
}

export default Login