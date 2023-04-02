import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState()
  const { dispatch } = useAuthContext()

  const signup = async (name, address, contact, email, password, user_id, date, enable) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://127.0.0.1:5000/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, address, contact, email, password, user_id, date, enable })
    })
    const json = await response.json()
    console.log("fetched")


    if (!response.ok) {
      console.log("ok")
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}