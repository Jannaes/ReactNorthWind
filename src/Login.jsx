import { useState } from 'react';
import './App.css';
import LoginService from './services/Auth'
import md5 from 'md5'


const Login = ({setIsPositive, setMessage, setShowMessage, setLoggedInUser}) => {

    // Komponentin tilan määritys

    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    

    //onSubmit tapahtumankäsittelijä funktio

const handleSubmit = (event) => {
    event.preventDefault()
      var userForAuth = {
        username: Username,
        password: md5(Password) // Salataan md5 kirjaston metodilla = hash
    }


    // Käytetään services/Auth.js tiedoston metodia

    LoginService.authenticate(userForAuth)
    .then(response => {
      if (response.status === 200) {

        // Tallennetaan token, username ja accesslevelId local storageen, jotta niitä voidaan käyttää muualla sovelluksessa (F12 Application välilehti)
        localStorage.setItem('username', response.data.username)  
        localStorage.setItem('accesslevelId', response.data.accesslevelId)
        localStorage.setItem('token', response.data.token )

        setLoggedInUser(response.data.username) // App-komponentin state, joka kertoo onko käyttäjä kirjautuneena sisään vai ei
        

       setMessage(`Logged in as: ${userForAuth.username}`)  // '${}' = template string-syntaksi
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

    }
        })
        .catch(error => {
            setMessage(error.message)
            setIsPositive(false)
            setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false)
                }, 6000)  // ilmoitus näkyy 6 sekuntia

        })
    }

    // Kenttien tyhjennys
    const emptyFields = () => {
        setUsername('')
        setPassword('')
    }

  return (
    <div id="loginWindow">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

            <div className='form-row'>
                <label>Username</label>
                <input type='text' value={Username} onChange={({target}) =>setUsername(target.value)}
                placeholder='Username'/>
            </div>
            <div className='form-row'>
                <label>Password</label>
                <input type='password' value={Password} onChange={({target}) =>setPassword(target.value)}
                placeholder='Password'/>
            </div>

            
            <button className="nappi" type="submit">Login</button>
            <button className="nappi" type="button" onClick={() => emptyFields()} >Empty</button>
        </form>

    </div>
  );
}

export default Login;