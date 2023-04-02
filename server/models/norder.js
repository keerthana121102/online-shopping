import mongoose, {model, Schema } from "mongoose";

const norderSchema = new Schema({
    user_id: String,
    order_id: String,
    
    status:  {
        type:String,
        default:"not received"
    },
});

  
export default model("Norder",norderSchema);