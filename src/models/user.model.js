import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const username = new Schema(
    {
        username:{
            type: String,//cloudinary url
            reqiured: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type: String,//cloudinary url
            reqiured: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullNameame:{
            type: String,//cloudinary url
            reqiured: true,
            trim: true,
            index: true
        },
        avatar:{
            type: String,//cloudinary url
            reqiured: true
        },
        coverImage:{
            type: String,
        },
        watchHistory:[
            {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
        password:{
            type: String,
            reqiured: [true, 'Password is required']
        },
        
        
    },
    {
        timestamps: true
    }
)
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isPasswordCorrect = async function(password){
     return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

//videoSchema.plugin(mongooseAggregatePaginate)                                                                                                                                                                                              
export const User = mongoose.model("User", userSchema)