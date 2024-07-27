import React from 'react'
import '../App.css'
import ProfilePage from './ProfilePage'


const Container = ({handleLogin,error,password,username,setPassword,setUserName,handleLoginClick}) => {


  return (
    <div>
    <div className='main-container'>
        <div className='contents'>
      <h3>Welcome back!👋</h3>
      <h2>Sign in to your account</h2>
      </div>
      <div className="input-container">
        <label>Your email</label>
        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)}/>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLoginClick}>Continue</button>

        {error && (
  <p style={{ color: 'red', textAlign: 'center',paddingTop:25 }}>{error}</p>
)}


      </div>
      <p>Forget your password?</p>
    </div>
    <div className='body-class'><p>Don't have an account? <span>Sign up</span></p></div>
    </div>
  )
}

export default Container
