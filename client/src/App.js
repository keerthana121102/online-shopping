import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useEmpContext } from './hooks/useEmpContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EmpHome from './pages/EmpHome'
import EmpLogin from './pages/EmpLogin'
import Footer from './pages/Footer'
import Navbar1 from './components/Navbar'
import Profile from './components/Profile'
import EmpProfile from './components/EmpProfile'
import UserNorder from './components/UserNorder'
import UserEorder from './components/UserEorder'
import EditProfile from './components/EditProfile'
import EditEmpProfile from './components/EditEmpProfile'
import EmpUserOrder from './components/EmpUserOrder'

function App() {
  const { user } = useAuthContext() 
  const { emp } = useEmpContext() 

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar1 />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : emp ? <EmpHome /> : <Navigate to="/user/signup" />} 
            />
            <Route 
              path="/user/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/user/signup" 
              element={!user && !emp ?  <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/emp/home" 
              element={emp ? <EmpHome /> : <Navigate to="/" />} 
            />
            <Route 
              path="/emp/login" 
              element={!emp ? <EmpLogin /> : <Navigate to="/emp/home" />} 
            />

            <Route 
              path="/user/:id" 
              element={<Profile />} 
            />
            <Route 
              path="user/:id/norder" 
              element={<UserNorder />} 
            />
            <Route 
              path="user/:id/eorder" 
              element={<UserEorder />} 
            />

            <Route 
              path="/emp/:id" 
              element={<EmpProfile />} 
            />
            <Route 
              path="emp/:id/eorder" 
              element={<UserEorder />} 
            />
            <Route 
              path="emp/user/:id" 
              element={<EmpUserOrder/>} 
            />

            <Route 
              path="user/:id/edit" 
              element={<EditProfile />} 
            />
            <Route 
              path="emp/:id/edit" 
              element={<EditEmpProfile />} 
            />


          </Routes>
        </div>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
