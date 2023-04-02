import { useState } from "react"
import { useEmpLogin } from "../hooks/useEmpLogin"

const EmpLogin = () => {
  const [emp_ids, setEmp_id] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useEmpLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(emp_ids, password)
  }

  return (
    <div>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Employee Id</label>
      <input 
        type="text" 
        onChange={(e) => setEmp_id(e.target.value)} 
        value={emp_ids} 
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

export default EmpLogin