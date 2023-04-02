import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useEmpLogout } from '../hooks/useEmpLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEmpContext } from '../hooks/useEmpContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';

const Navbar1 = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const { emp } = useEmpContext()
  const { emplogout } = useEmpLogout()

  const handleClick = () => {
    logout()
  }

  const handleClick1 = () => {
    emplogout()
  }
  
  
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Void</h1>
        </Link>
        <nav>
          {user && !emp && (
            <div>
              {/* <span>{user.email}</span> */}
              {/* <button style={{ marginRight: 50}} onClick={handleClick}>Log out</button> */}
            </div>
            
          )} 

          {!user && !emp && (
            <div style={{ display: 'flex' }}>
              <div >
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Login
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/user/login">User</Dropdown.Item>
                  <Dropdown.Item href="/emp/login">Employee</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

              <Link to="/user/signup">Signup</Link>
            </div>
          )}

          {user && !emp &&(
            <div>
              
             <Navbar bg="light" expand="lg">
             {/* <Navbar.Brand href="#"></Navbar.Brand> */}
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="mr-auto">
                 <Nav.Link href={`/user/${user.user._id}`}>Profile</Nav.Link>
                 <Nav.Link href={`/user/${user.user._id}/norder`}>Orders</Nav.Link>
                 <Nav.Link href={`/user/${user.user._id}/eorder`}>Emergency orders</Nav.Link>
                 <Nav.Link href="#"  onClick={handleClick}>Log out</Nav.Link>
               </Nav>
               
             </Navbar.Collapse>
           </Navbar>
           </div>
           
          )}

        {emp && !user && (
            <div>
              
             <Navbar bg="light" expand="lg">
             {/* <Navbar.Brand href="#"></Navbar.Brand> */}
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="mr-auto">
                 <Nav.Link href={`/emp/${emp.emp._ids}`}>Profile</Nav.Link>
                 <Nav.Link href="#"  onClick={handleClick1}>Log out</Nav.Link>
               </Nav>
               
             </Navbar.Collapse>
           </Navbar>
           </div>
           
          )}  



        </nav>
      </div>
    </header>
  )
}

export default Navbar1
