import Eorder from "../models/eorder.js";
import Norder from "../models/norder.js";
import pkg from 'bcryptjs';
import User from "../models/User.js"
const { compareSync, hashSync } = pkg;
import {v4 as uuidv4} from 'uuid'

let resarray=[];
export const getAllEorder = async (req, res) => {
  let orders;
  try {
    orders= await Eorder.find();
  } catch (err) {
    return console.log(err);
  }

  if (!orders) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ orders });
};

export const getEorderById = async (req, res) => {
  const id = req.params.id;
  console.log(id)

  let order;
  try {
    order= await Eorder.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!order) {
    return res.status(404).json({ message: "No order found" });
  }

  return res.status(200).json({ order });
};

let saveOrder ;
const createOrder = async(user_id,order_id,eorder_id,res) => {
  let order;
  try {
    order = new Eorder({
      user_id,
      order_id,
      eorder_id
      
    });

  }
  catch (err) {
    return console.log(err);
  }
  saveOrder = await order.save(); 
  if (saveOrder.length==0) {
    return res.status(500).json({ message: "Unexpected Error Occurred" });
    
  }
  else
  {
     return order;
  }
  
} 

const checkOrder = async (user_id,order_id,eorder_id,res) => {
  let x;
  for (let i of order_id) {
    let existingOrder= await Eorder.find({"order_id":i});
    if(existingOrder.length==0)
    {
      let existingOrder1= await Norder.find({"order_id":i});
      console.log(existingOrder1)
      if(existingOrder1.length==0)
      {
        x=createOrder(user_id,i,eorder_id,res);
        resarray.push(x);
      } 
      else
      {
        try{
    
          await Norder.deleteOne({"order_id":i});
         x= createOrder(user_id,i,eorder_id,res);
         resarray.push(x);

          
          console.log("deleteion success");
          }catch{
             console.log("unsuccessfull deletion");
          }
      }
      
    }
    else
    {
      
      x = "order already exists in eorder";
      resarray.push(x)
    }
  }
  return res.status(201).json({ resarray});

}

export const addEorder= async (req, res) => {
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
     let eorder_id = uuidv4();

    await checkOrder(user_id,order_id,eorder_id,res);
    
  };

  export const updateEorder=async(req,res)=>{
    const id=req.params.id;
    const{status}=req.body;
    let order;
    try{
    order=await Eorder.updateOne({"_id":id},{
        $set : {
            "status" : status
        }
    });
    return res.status(201).json({ order });
    }catch{
        return res.status(500).json({ message: "update fail" });
    }
    
  };
  
  export const deleteEorder=async(req,res)=>{
    const{order_id}=req.body;
    let existingOrder;
    try {
        
        existingOrder = await Eorder.find({"order_id":order_id});
        
    if (!existingOrder) {
        return res.status(404).json({ message: "order not found" });
    }
    } catch (err) {
        return console.log(err);
    }
    try{
    
    let order=await Eorder.deleteOne({"order_id":order_id});
    return res.status(201).json({ order});
    }catch{
        return res.status(201).json({ message:"delete fail"});
    }
    
  };



