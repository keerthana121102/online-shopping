import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function EmpUserOrder() {

  const [eorder, setEorder] = useState([])
  const [norder, setNorder] = useState([])

  const { id } = useParams()


  const user_id = id
  console.log("[+]Url id params ", id)
  useEffect(() => {

    console.log(id)
    fetch(`http://127.0.0.1:5000/user/${user_id}/eorder`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then(res => res.json())
      .then(data => setEorder(data))


    fetch(`http://127.0.0.1:5000/user/${user_id}/norder`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then(res => res.json())
      .then(data => setNorder(data))

    console.log(eorder)
    console.log(norder)

  }, [])

  return (

    <div style={{"height":450}}>

      <div>
        {norder.map((order) => {
          return (
            <div key={order._id}>

              <div>
                <div className="list-group">
                  <div className="list-group-item list-group-item-action " aria-current="true">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{order.order_id}</h5>
                      <input type= "text" className="mb-1"
                      value={order.status}/>
                    </div>
                  </div>


                </div>

              </div>

            </div>
          )
        })}
      </div>


      <div>

        <div>
          {eorder.map((order) => {
            return (
              <div key={order._id}>

                <div>
                  <div className="list-group">
                    <div className="list-group-item list-group-item-action " aria-current="true">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{order.order_id}</h5>
                        <input type= "text" className="mb-1"
                      value={order.status}/>
                      </div>
                    </div>


                  </div>

                </div>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
