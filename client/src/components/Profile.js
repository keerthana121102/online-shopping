import { Link } from 'react-router-dom'
import React from 'react'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';

export default function Profile() {


  // useEffect( async() => {
    
  //   const response = await fetch('http://127.0.0.1:5000/user/'+user.user_id+'/update', {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       // data
  //     }),
  //     headers: {
  //       'Content-Type': "application/json"
  //     }
  //   })
  // }, [])



//   const response = await fetch('http://127.0.0.1:5000/user/'+user.user_id+'/update', {
//   method: "GET",
//   headers: {
//     'Content-Type': "application/json"
//   }
// })

const user = JSON.parse(localStorage.getItem('user'))


  const [name, setName] = useState(user.user.name)
  const [address, setAddress] = useState(user.user.address)
  const [contact, setContact] = useState(user.user.contact)
  const [email, setEmail] = useState(user.user.email)
  const [date, setDate] = useState(user.user.date)
  const [enable, setEnable] = useState(user.user.enable)

  useEffect(() => {
    console.log(name)
    console.log(user.name)
    console.log(user)
  })

  return (
    <div>
            <div className="list-group">
            <div className="list-group-item list-group-item-action " aria-current="true">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Name : </h5>
              </div>
              <span className="mb-1">{name}</span>
            </div>
            <div className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Address :</h5>
              </div>
              <span className="mb-1">{address}</span>
            </div>
            <div className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Contact : </h5>
              </div>
              <span className="mb-1">{contact}</span>
            </div>
            <div className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Email :</h5>
              </div>
              <span className="mb-1">{email}</span>
            </div>
            <div className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Date : </h5>
              </div>
              <span className="mb-1">{date}</span>
            </div>
            <div className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Check defect : </h5>
              </div>
              <span className="mb-1">{enable ? "yes" : "no"}</span>
            </div>
          </div>
          <Link to={`/user/${user.user._id}/edit`}><button>Edit</button></Link>
    </div>
  )
}
