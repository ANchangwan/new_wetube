import bcrypt from "bcrypt";
import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    avatarUrl:String,
    socialOnly:{type:Boolean, default:false},
    username:{type:String, required:true, unique:true},
    password:{type:String},
    name:{type:String, required:true},
    location: String,
    videos: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Video", // Video model에 연결된 ObjectId로 구성된 array
    },]
});

userSchema.pre("save"
, async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 5); //this는 create 되는 값들을 의미한다.
                                                                //bcrypt.hash(비밀번호, 해싱횟수)
    }
});

const User = mongoose.model("User", userSchema);

export default User;