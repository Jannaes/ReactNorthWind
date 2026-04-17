import { useState } from 'react';
import './App.css';
import UserService from './services/User'
import md5 from 'md5'


const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {

    // Komponentin tilan määritys

    const [newUserId] = useState(muokattavaUser.userId);
    const [newFirstname, setNewFirstname] = useState(muokattavaUser.firstname);
    const [newLastname, setNewLastname] = useState(muokattavaUser.lastname);
    const [newEmail, setNewEmail] = useState(muokattavaUser.email);
    const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId);
    const [newUsername, setNewUsername] = useState(muokattavaUser.username);
    const [newPassword, setNewPassword] = useState(''); // tyhjä string
    

    //onSubmit tapahtumankäsittelijä funktio

const handleSubmit = (event) => {
    event.preventDefault()
      var newUser = {
        userId: newUserId,
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
        accesslevelId: parseInt(newAccesslevelId),
        username: newUsername
      };

        if (newPassword) {
            newUser.password = md5(newPassword);
    }


    UserService.update(newUser)
    .then(response => {
        if (response.status === 200) {
            setMessage("Edited User: " + newUser.username)
            setIsPositive(true)
            setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 5000)  // ilmoitus näkyy 5 sekuntia

            setMuokkaustila(false)
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
    <div id="edit">
        <h2>User Edit</h2>

        <form onSubmit={handleSubmit}>
            <div className='form-row'>
                <label>User ID</label>
                <input type='number' value={newUserId} disabled />
            </div>
            <div className='form-row'>
                <label>First name</label>
                <input type='text' value={newFirstname} onChange={({target}) =>setNewFirstname(target.value)} required
                placeholder='First Name'/>
            </div>
            <div className='form-row'>
                <label>Last name</label>
                <input type='text' value={newLastname} onChange={({target}) =>setNewLastname(target.value)} required
                placeholder='Last Name'/>
            </div>
            <div className='form-row'>
                <label>Email</label>
                <input type='email' value={newEmail} onChange={({target}) =>setNewEmail(target.value)} required
                placeholder='Email'/>
            </div>
            <div className='form-row'>
                <label>Access Level</label>
                <input type='number' value={newAccesslevelId} onChange={({target}) =>setNewAccesslevelId(parseInt(target.value))}
                placeholder='Access Level'/>
            </div>
            <div className='form-row'>
                <label>Username</label>
                <input type='text' value={newUsername} onChange={({target}) =>setNewUsername(target.value)}
                placeholder='Username'/>
            </div>
            <div className='form-row'>
                <label>Password</label>
                <input type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)}
                placeholder='Leave empty to keep current password' />
            </div>

            <button className="nappi" type="submit">Save</button>
            <button className="nappi" type="button" onClick={() => setMuokkaustila(false)} >Back</button>

        </form>

    </div>
  );
}

export default UserEdit;

