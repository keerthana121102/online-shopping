import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [user_id, setUser_id] = useState('')
  const [password, setPassword] = useState('')
  const [date, setDate] = useState('')
  const [enable, setEnable] = useState(0)
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("clicked")
    await signup(name, address, contact, email, password, user_id, date, enable)
  }

  function handleCheckboxChange(event) {
    setEnable(event.target.checked);
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
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
      <label>Password :</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <label>User Id :</label>
      <input 
        type="text" 
        onChange={(e) => setUser_id(e.target.value)} 
        value={user_id} 
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
      <button disabled={isLoading} onClick={handleSubmit}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup