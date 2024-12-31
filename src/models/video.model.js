import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
    {
        videoFile:{
            type: String,//cloudinary url
            reqiured: true
        },
        thumbnail:{
            type: String,//cloudinary url
            reqiured: true
        },
        title:{
            type: String,
            reqiured: true
        },
        description:{
            type: String,
            reqiured: true
        },
        duration:{
            type: Number,
            reqiured: true
        },
        views:{
            type: Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            defaul:true
        },
        Owner:{ 
            type: Schema.Types.ObjectId,
            ref:"User"
        }
        
    },
    {
        timestamps: true
    }
)
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)