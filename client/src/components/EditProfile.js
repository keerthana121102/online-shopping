import React from 'react'
import { useState } from "react" 
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {

  let navigate = useNavigate()

  const handleCheckboxChange = async (event) => {
    // if(e.target.value==0)
    // {
    //   setEnable(1)
    // }
    // else{
    //   setEnable(0)
    // }
    setEnable(event.target.checked);

  }

  const user = JSON.parse(localStorage.getItem('user'))

  const [name, setName] = useState(user.user.name)
  const [address, setAddress] = useState(user.user.address)
  const [contact, setContact] = useState(user.user.contact)
  const [email, setEmail] = useState(user.user.email)
  const [date, setDate] = useState(user.user.date)
  const [enable, setEnable] = useState(user.user.enable)
  const [isLoading, setLoading] = useState(false)
  const id = user.user._id;

  const handleSubmit = async () => {
    setLoading(true);
    console.log(user.user.user_id)
    const response = await fetch(`http://127.0.0.1:5000/user/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name, address, contact, email, date, enable
      }),
      headers: {
        'Content-Type': "application/json"
      }
    })
    console.log(response)
    const json = await response.json()
    localStorage.removeItem('user')

    
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update loading state
      setLoading(false)
    }

    navigate("/");

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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>User Id :</label>
        <input
          type="text"
          value={user.user.user_id}
          disabled
        />
        <label>Date :</label>
        <input
          type="number"
          onChange={(e) => setDate(e.target.value)}
          min={1}
          max={31}
          value={date}
        />
        <label>
          <input
            type="checkbox"
            checked={enable}
            onChange={handleCheckboxChange}
          />
          Want to check the defect?
        </label>
        <br></br>
        <button disabled={isLoading} onClick={handleSubmit}>Update</button>
      </form>
    </div>
  )
}

