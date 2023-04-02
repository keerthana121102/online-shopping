import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown, Form, Button }from 'react-bootstrap';


const Home = () => {

    const [order_id, setOrder_id] = useState("");
    const [item, setItem] = useState("");

    const [isLoading, setLoading] = useState(false);


    let array = []
    const [order_ids, setOrder_ids] = useState([]);
    const [isLoadings, setLoadings] = useState(false);

    const [emerOrderIds, setEmerOrderIds] = useState([])


    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user.user.user_id;

    // const [order, setOrder] = useState([]);
    // let array = []


    // const HandleOrder = () => {
    //   if(order_id!="" && order_id.trim()!="")
    //   {
    //     array.push(order_id);
    //     setOrder_id("");
    //     setOrder(array);
    //   }
    // }

    useEffect( ()=> {

      async() => {
        console.log(user.user.emp_ids)
        const response = await fetch(`http://127.0.0.1:5000/emp/${user.user.emp_ids}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
        const json = await response.json()
        console.log("fetched")
        console.log(json)
      }
      
    } , [])


    const HandleOrder = async() => {
      if(order_id.trim()!="")
        {
          setLoading(true);
        console.log(user_id, order_id)

        const response = await fetch('http://127.0.0.1:5000/norder/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user_id, order_id })
      })
      await response.json()

      if(!response.ok)
      {
        console.log("error ")
      }
      console.log("Added")

      setOrder_id("");
      setLoading(false);
      }
      
      
    }

    const UpdateDb = async() => {
      const order_id = emerOrderIds
      const response = await fetch('http://127.0.0.1:5000/eorder/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user_id, order_id })
      
      })
      setItem('')
      setEmerOrderIds([])
    }

    

    // const HandleOrder1 = () => {
      // if(order_id.trim()!="")
      //   {
      //     setLoading(true);
      //   console.log(user_id, order_id)

      //   const response = await fetch('http://127.0.0.1:5000/norder/add', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({ user_id, order_id })
      // })
      // await response.json()

      // if(!response.ok)
      // {
      //   console.log("error ")
      // }
      // console.log("Added")

      // setOrder_id("");
      // setLoading(false);
      // }
      
    const HandleOrder1 = () => {
      let emergency_orders = emerOrderIds
      emergency_orders.push(item)
      setItem('')
      setEmerOrderIds(emergency_orders)
    }


  return (
    <div>
      <div style={{  
            marginLeft: '400px',
            marginTop: '30px', 
            width: '40%' 
        }}>
            <Box color="white" 
                bgcolor="rgba(0,0,0,0.707)" borderRadius="5px" p={1}>
                <h4>ABOUT US!!!</h4>
                <hr></hr>
                <p>We act as a proxy for you. Use the details we provide you in online shopping. We will receive the order in behalf , check for defects and deliver it on a particular day on every month. Thus your valuable time can be conserved.</p>
            </Box>
        </div>
  
        <div  style={{  
            marginLeft: '400px',
            marginTop: '30px', 
            width: '40%' 
        }}>
          
        <label>Enter the order id : </label>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Add order id" aria-label="Add order id" aria-describedby="button-addon2" 
            onChange={(e) => setOrder_id(e.target.value)}
            value={order_id} 
          />
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" disabled={isLoading} onClick={HandleOrder}>Add</button>
        </div>

        <label>Enter the emergency order ids : </label>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Add order id" aria-label="Add order id" aria-describedby="button-addon2" 
            onChange={(e) => setItem(e.target.value)
            }
            value={item}
          />
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" disabled={isLoading} onClick={HandleOrder1}>Add</button>
          
        </div>
        {emerOrderIds.map(order => {
            return( <div>
              <p key={order}>{order}</p> 
              </div>
              )
          })}
          <button onClick={UpdateDb}>Add</button>
          

      </div>
    </div>
  )
}

export default Home