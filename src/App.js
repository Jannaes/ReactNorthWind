import './App.css';
import Laskuri from './Laskuri';
import Posts from './Posts';
import {useState, useEffect} from 'react';
import CustomerList from './CustomerList';
import UserList from './UserList';
import ProductList from './ProductList';
import Message from './Message';
import Login from './Login';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'; // Link-komponentti, joka mahdollistaa sivujen välisen navigoinnin ilman sivun uudelleenlatausta

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () => {

  // App komponentin tila
  // const [showLaskuri, setShowLaskuri] = useState(false)

  //Statet messagen näyttämistä varten
  const [showMessage, setShowMessage] = useState('') 
  const [message, setMessage] = useState('') 
  const [isPositive, setIsPositive] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState('')
  const [accesslevelId, setAccessLevelId] = useState(localStorage.getItem('accesslevelId'))  // haetaan access level localStoragesta, jotta voidaan näyttää UserList vain adminille (access level 1)
  

  // Käydään läpi local storagen data, jos käyttäjä on jo kirjautunut aiemmin

  useEffect(() => {
    let storedUser = localStorage.getItem('username')
    let storedAccesslevelId = localStorage.getItem('accesslevelId')

    if (storedUser !== null) {
      setLoggedInUser(storedUser)
    }

    if (storedAccesslevelId) {
      setAccessLevelId(String(storedAccesslevelId))
    }
  }, [])


  // Logout-napin tapahtumankäsittelijä 
  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
  }


  return (
    <div className="App">

      {!loggedInUser && 
        <Login 
          setIsPositive={setIsPositive} 
          setMessage={setMessage} 
          setShowMessage={setShowMessage} 
          setLoggedInUser={setLoggedInUser}
          setAccessLevelId={setAccessLevelId} // App-komponentin state, joka kertoo käyttäjän access levelin
          />}


{ loggedInUser &&  
        <Router>
            <Navbar bg="dark" variant="dark">
              <Navbar.Collapse>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/customers">Customers</Nav.Link>

                  {accesslevelId === "1" && (
                    <Nav.Link as={Link} to="/users">Users</Nav.Link>
                  )}

                  <Nav.Link as={Link} to="/products">Products</Nav.Link>
                  <Nav.Link as={Link} to="/posts">Typicode posts</Nav.Link>
                  <Nav.Link as={Link} to="/laskuri">Laskuri</Nav.Link>
                </Nav>

                <Nav>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            {/* <Navbar bg="dark" variant="dark">
              <Nav className="me-auto">
                  <Nav.Link as={Link} to="/customers">Customers</Nav.Link>

                  {accesslevelId === "1" && (
                  <Nav.Link as={Link} to="/users">Users</Nav.Link> )} // Näytä Users-linkki vain Access level 1:lle

                  <Nav.Link as={Link} to="/products">Products</Nav.Link>
                  <Nav.Link as={Link} to="/posts">Typicode posts</Nav.Link>
                  <Nav.Link as={Link} to="/laskuri">Laskuri</Nav.Link>
                  <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
              </Nav>
            </Navbar> */}

          <h1>Northwind Corporation</h1>
          
          {showMessage && <Message message={message} isPositive={isPositive} /> }

          <Routes>
            <Route path="/customers"
              element={<CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}>
            </Route>

            {accesslevelId === "1" && ( // Näytä UserList-reitti vain Access level 1:lle
            <Route path="/users"
              element={<UserList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} setAccessLevel={setAccessLevelId}/>}> 
            </Route>)}

            <Route path="/products"
              element={<ProductList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}>
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
