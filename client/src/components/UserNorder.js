import React, { useEffect, useState } from 'react'

export default function UserNorder() {

  const [norder, setNorder] = useState([])


//   const response = await fetch('http://127.0.0.1:5000/user/'+user.user_id+'/update', {
//   method: "GET",
//   headers: {
//     'Content-Type': "application/json"
//   }
// }) /:user_id/norder

const user = JSON.parse(localStorage.getItem('user'))
let json

  useEffect( () => {
    fetch(`http://127.0.0.1:5000/user/${user.user.user_id}/norder`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json"
      }
    })
    .then(res => res.json())
    .then(data => setNorder(data))
  
  },[]) 



  return (
    <div>
      {norder.map((order) => {
        return (
          <div key={order._id}>
            
            <div>
            <div className="list-group">
            <div className="list-group-item list-group-item-action " aria-current="true">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{order.order_id}</h5>
                <h5 className="mb-1">{order.status}</h5>
              </div>
            </div>
            
            
          </div>
          
    </div>

          </div>
        )
      })}
    </div>
  )
}
