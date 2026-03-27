import { useState, useEffect } from 'react';
import './App.css';
import UserService from './services/User'



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
        UserService.getAll()
        .then(data => {
            setUsers(data)
        })
    },[lisäystila, reload, muokkaustila]  // jos joku näistä muuttuu, useEffect() -hook ajetaan
    )

    // Hakukentän onChange tapahtumankäsittelijä
    const handleSearchInputChange = (event) => {
        setSearch(event.target.value.toLowerCase())
    }


    const editUsers = (user) => {
        setMuokattavaUser(user)
        setMuokkaustila(true)
    }

    // ehdollinen renderöinti = {}

  return (
    <>
        <h1><nobr>Users</nobr> 

            {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>} </h1>

            {!lisäystila && !muokkaustila && 
                <input placeholder="Search by Lastname" value={search} onChange={handleSearchInputChange} />} 


            <table id="userTable">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Accesslevel</th>
                    </tr>
                </thead>
                <tbody>
            
                        {users && users.map(u => 
                            {
                                const lowerCaseName = u.lastname.toLowerCase()
                                if (lowerCaseName.indexOf(search) > -1) {
                                    return(
                                        <tr key={u.userId}>
                                            <td>{u.firstname}</td>
                                            <td>{u.lastname}</td>
                                            <td>{u.email}</td>
                                            <td>{u.accesslevelId}</td>
                                        </tr>
                                )
                                }
                            }
                        )
                    }
            </tbody>
        </table>
    </>
  );
}

export default UserList;