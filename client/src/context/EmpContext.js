import { createContext, useReducer, useEffect } from 'react'

export const EmpContext = createContext()

export const empReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { emp: action.payload }
    case 'LOGOUT':
      return { emp: null }
    default:
      return state
  }
}

export const EmpContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(empReducer, { 
    emp: null
  })

  useEffect(() => {
    const emp = JSON.parse(localStorage.getItem('emp'))
    console.log(emp)
    if (emp) {
      dispatch({ type: 'LOGIN', payload: emp }) 
    }
  }, [])

  console.log('EmpContext state:', state)
  
  return (
    <EmpContext.Provider value={{ ...state, dispatch }}>
      { children }
    </EmpContext.Provider>
  )

}