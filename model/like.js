const mongoose= require('mongoose')


const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    likable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'noModel'
    },
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
})


const Like=mongoose.model('Like',likeSchema)

module.exports = Like