import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;

const postSchema = new mongoose.Schema({
    content : {
        type: {},
        required: true,
    },

    image: {
        url: String,
        public_id: String,
    },

    video: {
        url: String,
        public_id: String,
    },
}, {timestamps: true}
);


export default mongoose.model('Post', postSchema);