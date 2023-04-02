import { Link } from 'react-router-dom'
import React from 'react'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown, Form, Button }from 'react-bootstrap';

export default function EmpProfile() {


  // useEffect( async() => {
    
  //   const response = await fetch('http://127.0.0.1:5000/emp/'+emp.emp_id+'/update', {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       // data
  //     }),
  //     headers: {
  //       'Content-Type': "application/json"
  //     }
  //   })
  // }, [])



//   const response = await fetch('http://127.0.0.1:5000/emp/'+emp.emp_id+'/update', {
//   method: "GET",
//   headers: {
//     'Content-Type': "application/json"
//   }
// })

const emp = JSON.parse(localStorage.getItem('emp'))


  const [name, setName] = useState(emp.emp.name)
  const [address, setAddress] = useState(emp.emp.address)
  const [contact, setContact] = useState(emp.emp.contact)
  const [email, setEmail] = useState(emp.emp.email)
  const pass_other = emp.emp.pass_other

  useEffect(() => {
    console.log(name)
    console.log(emp.name)
    console.log(emp)
  })

  return (
    <div>
            <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action " aria-current="true">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Name : </h5>
              </div>
              <p className="mb-1">{name}</p>
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Address :</h5>
              </div>
              <p className="mb-1">{address}</p>
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Contact : </h5>
              </div>
              <p className="mb-1">{contact}</p>
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Email :</h5>
              </div>
              <p className="mb-1">{email}</p>
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Employee ID :</h5>
              </div>
              <p className="mb-1">{emp.emp.emp_ids}</p>
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Password for other websites :</h5>
              </div>
              <p className="mb-1">{pass_other}</p>
            </a>
            
          </div>
          <Link to={`/emp/${emp.emp._id}/edit`}><button>Edit</button></Link>
    </div>
  )
}
