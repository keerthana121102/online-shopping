import mongoose, {model, Schema } from "mongoose";

const eorderSchema = new Schema({
    user_id: String,
    order_id: String,
    eorder_id: {
        type: String
    },
    status:  {
        type:String,
        default:"not received"
    },
});

  
export default model("Eorder",eorderSchema);