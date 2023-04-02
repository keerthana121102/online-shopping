import { useState } from 'react'
import { useEmpContext } from './useEmpContext'

export const useEmpLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useEmpContext()

  const login = async (emp_ids, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://127.0.0.1:5000/emp/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ emp_ids, password })
    })
    const json = await response.json()
    console.log("fetched")

    if (!response.ok) {
      console.log("done")
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('emp', JSON.stringify(json))

      // update the emp context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}