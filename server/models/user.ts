import mongoose, { Model,Document } from "mongoose";
import { createHmac , randomBytes } from "crypto";

interface IUser extends Document{ //We are extending to  Document type bcz n Mongoose, the isModified function is used to check if a particular field in a document has been modified. This function is available on individual documents (instances of a Mongoose model) and is used to determine whether a field has been changed since the document was loaded or saved
    fullName: string;
    email:string;
    password:string;
    role:string;
    salt:string;
}

interface UserModel extends Model<IUser> {
    matchPasswordAndGiveToken():String
}

const userSchema= new mongoose.Schema<IUser,UserModel>({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['NORMAL','ADMIN'],
        default:'NORMAL',
        required:true
    },
    salt:{
        type:String,
       
    },
    
    
},{timestamps:true})

userSchema.pre<IUser>('save', function (next){
    const user= this;
    if(!user.isModified("password")) {return}
    const secret= randomBytes(17).toString()
    const hashedPassword = createHmac('sha256', secret).update(user.password).digest('hex');
    console.log(hashedPassword);
    this.salt = secret
    this.password = hashedPassword
    next()
})

const user= mongoose.model<IUser,UserModel>('user', userSchema)

export default user