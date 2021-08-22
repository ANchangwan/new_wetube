import bcrypt from "bcrypt";
import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    name:{type:String, required:true},
    location: String,
});

userSchema.pre("save"
, async function(){
    this.password = await bcrypt.hash(this.password, 5); //this는 create 되는 값들을 의미한다.
                                                        //bcrypt.hash(비밀번호, 해싱횟수)
});

const User = mongoose.model("User", userSchema);

export default User;