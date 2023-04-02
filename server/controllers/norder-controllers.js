import Norder from "../models/norder.js";
import pkg from 'bcryptjs';
import User from "../models/User.js"
const { compareSync, hashSync } = pkg;

export const getAllNorder = async (req, res) => {
  let orders;
  try {
    orders= await Norder.find();
  } catch (err) {
    return console.log(err);
  }

  if (!orders) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ orders });
};

export const getNorderById = async (req, res) => {
  const id = req.params.id;
  console.log(id)

  let order;
  try {
    order= await Norder.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!order) {
    return res.status(404).json({ message: "No order found" });
  }

  return res.status(200).json({ order });
};

const checkOrder = async (a) => {
    let existingOrder= await Norder.find({"order_id": a});
    if (existingOrder.length!=0) {
      console.log("order exists")
      return false
    }
  return true
}

export const addNorder= async (req, res) => {
    const { user_id,order_id} = req.body;
    if (
      !user_id &&
      user_id.trim() === "" &&
      !order_id &&
      order_id.trim() === "" 
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
    console.log("[+]", orderExistsFlag)

    //let orderExistsFlag = await Norder.find({"order_id": order_id});
    

    let saveOrder ;
    if (orderExistsFlag==true) {
      let order;
      try {
        order = new Norder({
          user_id,
          order_id
        });
    
      }
      catch (err) {
        return console.log(err);
      }
      saveOrder = await order.save(); 
      if (saveOrder.length==0) {
        return res.status(500).json({ message: "Unexpected Error Occurred" });
      }
      return res.status(201).json({ order });
    } else {
        console.log("enters else")
      // return order exists
    }
    
  };

  export const updateNorder=async(req,res)=>{
    const id=req.params.id;
    const{status}=req.body;
    let order;
    try{
    order=await Norder.updateOne({"_id":id},{
        $set : {
            "status" : status
        }
    });
    return res.status(201).json({ order });
    }catch{
        return res.status(500).json({ message: "update fail" });
    }
    
  };
  
  export const deleteNorder=async(req,res)=>{
    const{order_id}=req.body;
    let existingOrder;
    try {
        
        existingOrder = await Norder.find({"order_id":order_id});
        
    if (!existingOrder) {
        return res.status(404).json({ message: "order not found" });
    }
    } catch (err) {
        return console.log(err);
    }
    try{
    
    let order=await Norder.deleteOne({"order_id":order_id});
    return res.status(201).json({ order});
    }catch{
        return res.status(201).json({ message:"delete fail"});
    }
    
  };



