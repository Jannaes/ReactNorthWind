import './App.css';
import Laskuri from './Laskuri';
import Viesti from './Viesti';
import Posts from './Posts';
import {useState, useEffect} from 'react';
import CustomerList from './CustomerList';
import UserList from './UserList';
import Message from './Message';
import Login from './Login';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () => {

  // App komponentin tila
  const [showLaskuri, setShowLaskuri] = useState(false)

  //Statet messagen näyttämistä varten
  const [showMessage, setShowMessage] = useState('') 
  const [message, setMessage] = useState('') 
  const [isPositive, setIsPositive] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState('')
  

  // Käydään läpi local storagen data, jos käyttäjä on jo kirjautunut aiemmin
  useEffect(() => {
    let storedUser = localStorage.getItem('username')
    if (storedUser !== null) {
      setLoggedInUser(storedUser)
    }
  }, [])


  // Logout-napin tapahtumankäsittelijä 
  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
  }


  return (
    <div className="App">

      {!loggedInUser && <Login setIsPositive={setIsPositive} setMessage={setMessage} 
      setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser}/>}


{ loggedInUser && 
        <Router>
            <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto">
                  <Nav.Link href='/customers'>Customers</Nav.Link>
                  <Nav.Link href='/users'>Users</Nav.Link>
                  <Nav.Link href='/posts'>Typicode posts</Nav.Link>
                  <Nav.Link href='/laskuri'>Laskuri</Nav.Link>
                  <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
              </Nav>
            </Navbar>

          <h1>Northwind Corporation</h1>
          
          {showMessage && <Message message={message} isPositive={isPositive} /> }

          <Routes>
            <Route path="/Customers"
              element={<CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}>
            </Route>

            <Route path="/Users"
              element={<UserList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}>
            </Route>

            <Route path="/posts"
              element={<Posts />}>
            </Route>

            <Route path="/laskuri" 
              element={<Laskuri />}>
            </Route>

                {/* {showLaskuri && <Laskuri huomio={huomio}/>}

                {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}

                {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}

                <Viesti teksti="tervehdys app komponentista"/> */}

          </Routes>
        </Router>

}
    </div>
  );
}

export default App;
