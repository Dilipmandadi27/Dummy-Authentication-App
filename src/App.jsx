import { useEffect, useState } from 'react'
import './App.css'
import Container from './Components/Container'
import ProfilePage from './Components/ProfilePage'

const App = () => {

 const [user,setUser] =useState(null)
 const [username,setUserName] =useState('')
 const [password,setPassword] =useState('')
 const [isLoggedIn,setIsLoggedIn] =useState(false)
 const [error,setError] =useState('')
 const [localError, setLocalError] = useState('');


 //Effect hook to check if user is already logged in
  useEffect(()=>{
   const storedUser = localStorage.getItem('user')
   if(storedUser){
    setUser(JSON.parse(storedUser))
    setIsLoggedIn(true)
   }
  },[])

  // for validations
  const validateInputs = () => {
    if (!username.trim()) {
      setLocalError('Username is required');
      return false;
    }
    if (!password.trim()) {
      setLocalError('Password is required');
      return false;
    }
    setLocalError('');
    return true;
  };
   const handleLoginClick = () => {
  if (validateInputs()) {
    handleLogin();
  }
};


//// Function to handle login

   const handleLogin = async ()=>{
    try{
           const response = await fetch('https://dummyjson.com/auth/login', {
             method: 'POST',
             headers:{'Content-Type': 'application/json'},
             body: JSON.stringify({
              username:'emilys',
              password: 'emilyspass'
            })
           })
           
           const result = await response.json();

           if(response.ok){
            localStorage.setItem('user', JSON.stringify(result))
            setUser(result)
            setIsLoggedIn(true)
            
           }
           else{
            setError(result.message || 'Login failed')
           }

           } catch (err) {
            setError('An error occurred')
           }
    }

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');  // Remove user data from local storage
    setUser(null);                    // Clear user state
    setIsLoggedIn(false);            // Update login status
  };


  // Function to fetch profile data


  const fetchProfileData = async ()=>{

    if(user){

      try{
        const response = await fetch(`https://dummyjson.com/users/${user.id}`)
        const result = await response.json()

        if(response.ok){
          localStorage.setItem('user', JSON.stringify(result))
          setUser(result)
        }
        else{
          handleLogout();
        }
      }
      catch (err) {
        handleLogout();                                       // Handle network or other errors
      }
    }
  }

    useEffect(()=>{
      if(isLoggedIn){
        fetchProfileData()
      }
    },[isLoggedIn])



  return (
    <div>
      {!isLoggedIn ? (
        <Container 
         handleLogin={handleLogin}
         error={error} username={username} 
         password={password} setPassword = {setPassword}
          setUserName={setUserName}
          handleLoginClick={handleLoginClick}/>
        ) : (
        <ProfilePage 
         user={user} handleLogout={handleLogout}/>
        )}
    </div>
  )
}

export default App

