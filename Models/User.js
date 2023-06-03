import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    avatar:String,
    cover:String
});

export default mongoose.model('User', userSchema);