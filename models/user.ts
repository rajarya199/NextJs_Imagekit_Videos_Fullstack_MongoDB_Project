import mongoose,{Schema,model,models} from "mongoose";
import bcrypt from "bcryptjs";

export interface Iuser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<Iuser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save",async function(next){
    if(this.ismodified("password")){
        this.password= await bcrypt
    }
next()
})

//if model is present use it ,else create new model with user schema
const User=models?.User || model<Iuser>("User", userSchema);

export default User