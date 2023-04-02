import mongoose, {model, Schema } from "mongoose";

const empSchema = new Schema({
    name : String,
    address : String,
    contact : Number,
    email : {
        type : String,
        required : true,
        lowercase : true
    },
    password : String,
    pass_other: String,
    emp_ids : {
      type : String,
      required:true,    
    },

});

  
export default model("Emp",empSchema);