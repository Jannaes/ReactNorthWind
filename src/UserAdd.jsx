import { useState } from 'react';
import './App.css';
import UserService from './services/User'
import md5 from 'md5'


const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    // Komponentin tilan määritys

    const [newFirstname, setNewFirstname] = useState('')
    const [newLastname, setNewLastname] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAccesslevelId, setNewAccesslevelId] = useState(2)  // oletuksena 2, voi olla myös 0 tai 1
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    

    //onSubmit tapahtumankäsittelijä funktio

const handleSubmit = (event) => {
    event.preventDefault()
      var newUser = {
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccesslevelId),
        username: newUsername,
        password: md5(newPassword) // Salataan md5 kirjaston metodilla = hash
    }


    console.log(newUser)


    UserService.create(newUser)
    .then(response => {
      if (response.status === 200) {
       setMessage(`Added new User: ${newUser.firstname} ${newUser.lastname}`)  // '${}' = template string-syntaksi
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setLisäystila(false)
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

  return (
    <div id="addNew">
        <h2>Add User</h2>

        <form onSubmit={handleSubmit}>
            <div className='form-row'>
                <label>First Name</label>
                <input type='text' value={newFirstname} onChange={({target}) =>setNewFirstname(target.value)} required
                placeholder='Firstname'/>
            </div>
            <div className='form-row'>
                <label>Last Name</label>
                <input type='text' value={newLastname} onChange={({target}) =>setNewLastname(target.value)} required
                placeholder='Lastname'/>
            </div>
            <div className='form-row'>
                <label>Email</label>
                <input type='email' value={newEmail} onChange={({target}) =>setNewEmail(target.value)}
                placeholder='Email'/>
            </div>
            <div className='form-row'>
                <label>Access Level</label>
                <input type='number' value={newAccesslevelId} onChange={({target}) =>setNewAccesslevelId(target.value)}
                placeholder='Access Level'/>
            </div>
            <div className='form-row'>
                <label>Username</label>
                <input type='text' value={newUsername} onChange={({target}) =>setNewUsername(target.value)}
                placeholder='Username'/>
            </div>
            <div className='form-row'>
                <label>Password</label>
                <input type='password' value={newPassword} onChange={({target}) =>setNewPassword(target.value)}
                placeholder='Password'/>
            </div>

            
            <button className="nappi" type="submit">Save</button>
            <button className="nappi" type="button" onClick={() => setLisäystila(false)} >Back</button>
        </form>

    </div>
  );
}

export default UserAdd;