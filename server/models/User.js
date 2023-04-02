import mongoose, {model, Schema } from "mongoose";

const userSchema = new Schema({
    name : String,
    address : String,
    contact : Number,
    email : {
        type : String,
        required : true,
        lowercase : true
    },
    password : String,
    user_id : String,
    emp_ids : {
      type : String,
      ref: "Emp",
      default : 0
    },
    date : {
        type : Number,
        min : 0,
        max : 31,
        default : 0
    },
    enable : {
        type : Number,
        default : 0
    }

});

  
export default model("User",userSchema);