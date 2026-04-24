import './App.css';
import UserService from './services/User'
import { FaTrash, FaEdit } from 'react-icons/fa'

    // props on nimeltään customer
    const User = ({user, editUser, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    // Komponentin tilan määritys
    // const [showDetails, setShowDetails] = useState(false)

    const deleteUser = (user) => {
        let vastaus = window.confirm(`Remove User ${user.firstname} ${user.lastname} `)

        if (vastaus === true) {
        UserService.remove(user.userId)
        .then(res => {
            if (res.status === 200) {
                setMessage(`Successfully removed user ${user.userId}`)
                setIsPositive(true)
                setShowMessage(true)
                window.scrollBy(0, -10000) // scrollataan ylös jotta nähdään alert

                //ilmoituksen piilotus
                setTimeout(() => {
                setShowMessage(false)
                }, 5000)  // ilmoitus näkyy 5 sekuntia

                reloadNow(!reload)
            }
            })
                .catch(error => {
                setMessage(error.message)
                setIsPositive(false)
                setShowMessage(true)
                window.scrollBy(0, -10000)

                    setTimeout(() => {
                    setShowMessage(false)
                    }, 6000)  // ilmoitus näkyy 6 sekuntia
                })

                

            }
            
            //Jos poisto halutaankin perua
            else {
                setMessage(`Poisto peruttu onnistuneesti`)
                setIsPositive(true)
                setShowMessage(true)
                window.scrollBy(0, -10000)

                //ilmoituksen piilotus
                setTimeout(() => {
                setShowMessage(false)
                }, 5000)  // ilmoitus näkyy 5 sekuntia
        }
}

    

  return (

            <tr>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.accesslevelId}</td>
                <td>
                    <button className="nappi" onClick={() => editUser(user)}
                        title='Edit'>
                    <FaEdit />
                    </button>

                    <button className="nappi" onClick={() => deleteUser(user)}
                        title='Delete'>
                    <FaTrash />
                    </button>

                    {/* <button className="nappi" onClick={() => editUser(user)}>Edit</button>
                    <button className="nappi" onClick={() => deleteUser(user)}>Delete</button> */}
                </td>
            </tr>
  )
}

export default User;