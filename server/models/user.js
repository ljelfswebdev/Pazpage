import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6, 
        max: 64,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: String,
        default: "Admin",
    },
}, {timestamps: true}
);

export default mongoose.model('User', userSchema);