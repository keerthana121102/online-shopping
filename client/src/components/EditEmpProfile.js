import React from 'react'
import { useState } from "react" 
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {

  let navigate = useNavigate()

  const emp = JSON.parse(localStorage.getItem('emp'))

  const [name, setName] = useState(emp.emp.name)
  const [address, setAddress] = useState(emp.emp.address)
  const [contact, setContact] = useState(emp.emp.contact)
  const email = emp.emp.email
  const pass_other = emp.emp.pass_other
  const [isLoading, setLoading] = useState(false)
  const id = emp.emp._id;

  const handleSubmit = async () => {
    setLoading(true);
    console.log(emp.emp.emp_id)
    const response = await fetch(`http://127.0.0.1:5000/emp/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name, address, contact
      }),
      headers: {
        'Content-Type': "application/json"
      }
    })
    console.log(response)
    const json = await response.json()
    localStorage.removeItem('emp')
    
    if (response.ok) {
      // save the emp to local storage
      localStorage.setItem('emp', JSON.stringify(json))

      // update loading state
      setLoading(false)
    }

    navigate("/emp/home");

  }

  return (
    <div>
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Update Profile</h3>

        <label>Name :</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Address :</label>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <label>Contact :</label>
        <input
          type="text"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />
        <label>Email :</label>
        <input
          type="email"
          value={email}
          disabled
        />
        <label>Password for other websites :</label>
        <input
          type="text"
          value={pass_other}
          disabled
        />
        <label>Employee Id :</label>
        <input
          type="text"
          value={emp.emp.emp_ids}
          disabled
        />

        <br></br>
        <button disabled={isLoading} onClick={handleSubmit}>Update</button>
      </form>
    </div>
  )
}

