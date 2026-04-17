import { useState, useEffect } from 'react';
import './App.css';
import UserService from './services/User'
import User from './User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'



const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

    // Komponentin tilan määritys
    const [users, setUsers] = useState([])
    const [lisäystila, setLisäystila] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaUser, setMuokattavaUser] = useState(false)
    const [search, setSearch] = useState("")
    

    // UseEffect ajetaan aina alussa kerran
    useEffect(() => {
            // Tokenin asetus UserServiceen, jotta sitä voidaan käyttää kaikissa UserServiceen liittyvissä metodeissa
        const token = localStorage.getItem('token')
            UserService
            .setToken(token)

        UserService.getAll()
        .then(data => {
            setUsers(data)
        })
    },[lisäystila, reload, muokkaustila]  // jos joku näistä muuttuu, useEffect() -hook ajetaan uudestaan 
    )

    // Hakukentän onChange tapahtumankäsittelijä
    const handleSearchInputChange = (event) => {
        setSearch(event.target.value.toLowerCase())
    }


    const editUser = (user) => {
        setMuokattavaUser(user)
        setMuokkaustila(true)
    }

    // ehdollinen renderöinti = {} 

  return (
    <>
        <h1><nobr>Users</nobr> 

            {lisäystila && <UserAdd setLisäystila={setLisäystila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

            {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>} </h1>

            {!lisäystila && !muokkaustila && 
                <input placeholder="Search by Lastname" value={search} onChange={handleSearchInputChange} />} 

            {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            muokattavaUser={muokattavaUser}
            />}
                


            {!lisäystila && !muokkaustila &&
                <table id="userTable">
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Accesslevel</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                        <tbody>
                        {users && users
                            .filter(u =>
                                u.lastname.toLowerCase().includes(search)
                            )
                            .map(u => (
                                <User
                                key={u.userId}
                                user={u}
                                editUser={editUser}
                                setIsPositive={setIsPositive}
                                setMessage={setMessage}
                                setShowMessage={setShowMessage}
                                reload={reload}
                                reloadNow={reloadNow}
                                />
                            ))}
                        </tbody>
                </table>
            
            }


    </>
  );
}

export default UserList;