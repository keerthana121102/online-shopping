import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [user_id, setUser_id] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(user_id, password)
  }

  return (
    <div>
    <form className="login">
      <h3>Log In</h3>
      
      <label>User Id</label>
      <input 
        type="text" 
        onChange={(e) => setUser_id(e.target.value)} 
        value={user_id} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading} onClick={handleSubmit}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>

    <div style={{ height:"140px"}}>

    </div>

    </div>
  )
}

export default Login