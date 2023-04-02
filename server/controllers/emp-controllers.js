import Emp from "../models/Emp.js";
import Eorder from "../models/eorder.js";
import pkg from 'bcryptjs';
const { compareSync, hashSync } = pkg;
import User from "../models/User.js"

export const getAllEmp = async (req, res) => {
  let emps;
  try {
    emps = await Emp.find();
  } catch (err) {
    return console.log(err);
  }

  if (!emps) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ emps });
};




export const login = async (req, res, next) => {
  const { emp_ids, password } = req.body;
  if (!emp_ids && !password && password.length < 6) {
    return res.status(422).json({ message: "Inavalid Data" });
  }

  let emp;
  try {
    emp = await Emp.findOne({ emp_ids });
  } catch (err) {
    return console.log(err);
  }
  if (!emp) {
    return res.status(404).json({ message: "No employee found" });
  }
  // const isPasswordCorrect = compareSync(password, existingEmp.password);


  if (password != emp.password) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res
    .status(200)
    .json({ emp });
};


export const getEmpById = async (req, res) => {
  const id = req.params.id;
  //console.log(id);

  let emp;
  try {
    emp = await Emp.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!emp) {
    return res.status(404).json({ message: "No employee found" });
  }

  return res.status(200).json({ emp });
};

export const getEmployeeUser = async (req, res) => {
  try {
    const { emp_ids } = req.params;
    const user = await User.find({ "emp_ids": emp_ids });
    console.log(user)
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  const id = req.params.id;
  const { name, address, contact } = req.body;
  // console.log(password);
  if (
    !name &&
    name.trim() === "" &&
    !address &&
    address.trim() === "" &&
    !contact &&
    contact.trim() === "" &&
    contact.length == 10


  ) {
    return res.status(422).json({ message: "Inavalid Data" });
  }
  let order;
  let emp;
  try {
    order = await Emp.updateOne({ "_id": id }, {
      $set: {
        "name": name,
        "address": address,
        "contact": contact
      }
    });
    console.log(order)
    emp= await Emp.findById(id);
    if(emp){
      console.log("emp found");
    
    return res.status(201).json({ emp });
    }
    else{
      console.log("emp not retrieved");
    }
  } catch {
    return res.status(500).json({ message: "update fail" });
  }


};


export const getEorderByEmpId = async (req, res) => {
  let o = [];
  const id = req.params.id;

  let emp;
  try {
    emp = await Emp.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (emp) {
    console.log("employee found");
  }
  else {
    return console.log("no match found for employee");
  }
  const empid = emp.emp_ids;
  let users;
  try {
    users = await User.find({ "emp_ids": empid });
  } catch (err) {
    return console.log(err);
  }
  if (users) {
    console.log("users retrieved");
  }
  else {
    return console.log("user not found")
  }
  for (let i of users) {

    try {
      let x = i.user_id;
      const eorders = await Eorder.find({ "user_id": x });
      for (let y of eorders) {
        o.push(y);
      }

      // res.status(200).json(eorders);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  return res.status(201).json({ o });
}
