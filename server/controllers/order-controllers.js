import Order from "../models/order.js";
import pkg from 'bcryptjs';
import User from "../models/User.js"
const { compareSync, hashSync } = pkg;

export const getAllOrder = async (req, res) => {
  let orders;
  try {
    orders= await Order.find();
  } catch (errh) {
    return console.log(err);
  }

  if (!orders) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ orders });
};

export const getOrderById = async (req, res) => {
  const id = req.params.id;

  let order;
  try {
    order= await Order.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!order) {
    return res.status(404).json({ message: "No order found" });
  }

  return res.status(200).json({ order });
};

const checkOrder = async (a) => {
  for (let i of a) {
    let existingOrder= await Order.find({"order_id":{$in :[i]}});
    console.log(existingOrder);
    if (existingOrder.length!=0) {
      console.log(existingOrder);
      console.log("order exists")
      return false
    }
  }
  return true
}

export const addOrder= async (req, res) => {
    const { user_id,order_id,emergency} = req.body;
    if (
      !user_id &&
      user_id.trim() === "" &&
      !order_id &&
      order_id.trim() === "" &&
      !emergency&&
      emergency.trim() === "" 
    ) {
      return res.status(422).json({ message: "Invalid Data" });
    }
    
    let existingUser;
        try {
            
            existingUser = await User.find({"user_id":user_id});
            
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        } catch (err) {
            return console.log(err);
        }
     
    let orderExistsFlag = await checkOrder(order_id);
    //console.log("[+]", orderExistsFlag)
    

    if (orderExistsFlag) {
      let order;
      try {
        order = new Order({
          user_id,
          order_id,
          emergency,
        });
       
        let saveOrder = await order.save(); 
      }
      catch (err) {
        return console.log(err);
      }

      if (!order) {
        return res.status(500).json({ message: "Unexpected Error Occurred" });
      }
      return res.status(201).json({ order });
    } else {
      // return order exists
    }
    
  };

  export const updateOrder=async(req,res)=>{
    const{order_id,status}=req.body;
    let order;
    order=await Order.findById(order_id);
    order.status=status;
    
  }



