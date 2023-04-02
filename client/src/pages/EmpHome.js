import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function EmpHome() {
  const [orders, setOrders] = useState([])

  const emp = JSON.parse(localStorage.getItem('emp'))
  const emp_ids = emp.emp.emp_ids

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/emp/${emp_ids}/users`).then(res => res.json()).then(data => {
      setOrders(data)

    })
  }, [])

  return (
    <div className='emphome'>
      {orders.map(order => {
        return (
          <Link to={`/emp/user/${order._id}`} key={order._id}>
            
            <div>
            <div className="list-group">
            <div className="list-group-item list-group-item-action " aria-current="true">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{order.user_id}</h5>
              </div>
            </div>
            
          </div>
          
    </div>

          </Link>
        )
      })}
    </div>
  )
}

