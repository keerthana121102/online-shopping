import User from "../models/User.js";
import pkg from "bcryptjs";
const { compareSync, hashSync } = pkg;
import Norder from "../models/norder.js";
import Eorder from "../models/eorder.js";

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, address, contact, email, password, user_id, date, enable } =
    req.body;
  // console.log(password);
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6 &&
    !address &&
    address.trim() === "" &&
    !contact &&
    contact.trim() === "" &&
    contact.length == 10 &&
    !user_id &&
    user_id.trim() === ""
  ) {
    return res.status(422).json({ message: "Inavalid Data" });
  }

  //const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash(password, salt);
  const hashedPassword = hashSync(password);

  let user;
  try {
    user = new User({
      name,
      address,
      contact,
      email,
      password: hashedPassword,
      user_id,
      date,
      enable,
    });
    await user.save();
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { user_id, password } = req.body;
  if (!user_id && user_id.trim() === "" && !password && password.length < 6) {
    return res.status(422).json({ message: "Inavalid Data" });
  }

  let user;
  try {
    user = await User.findOne({ user_id });
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }
  const isPasswordCorrect = compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res
    .status(200)
    .json({ user });
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }

  return res.status(200).json({ user });
};
export const getUserByUserId = async (req, res) => {
  const { user_id } = req.params;
  console.log(user_id);

  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }

  return res.status(200).json({ user });
};

export const getUserNorder = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await Norder.find({ user_id });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserEorder = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await Eorder.find({ user_id });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateProfile= async (req, res) => {
  const id = req.params.id;
  const { name, address,contact,email,date,enable} = req.body;
 // console.log(password);
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !address &&
    address.trim() ==="" &&
    !contact &&
    contact.trim()==="" &&
    contact.length==10 &&
    !date &&
    date.trim()===""

  ) {
    return res.status(422).json({ message: "Inavalid Data" });
  }
  let order;
  let user;
  console.log(id)
try{
  order=await User.updateOne({"_id":id},{
    $set : {
        "name" : name,
        "address":address,
        "contact":contact,
        "email":email,
        "date":date,
        "enable":enable
    }
});
console.log(order)
user= await User.findById(id);
if(user){
  console.log("user found");

return res.status(201).json({ user});
}
else{
  console.log("user not retrieved");
}
}catch{
    return res.status(500).json({ message: "update fail" });
}
  
  
};