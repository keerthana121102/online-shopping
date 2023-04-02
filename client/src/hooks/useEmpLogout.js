import { useEmpContext } from './useEmpContext'

export const useEmpLogout = () => {
  const { dispatch } = useEmpContext()

  const emplogout = () => {
    // remove emp from storage
    localStorage.removeItem('emp')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { emplogout }
}