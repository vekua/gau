import express from "express";
import mongoose from "mongoose";
import Post from "./Models/Post.js";
import User from "./Models/User.js";
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors({origin:'https://gau-project-7fb02.web.app'}));


app.post('/create', async (req, res) => {
    try{
        const body = req.body;
        const post = new Post({author: body.author, content: body.content, pfp: body.pfp});
        await post.save();
        res.json(post);

    } catch(err) {
        console.log(`Error: ${err}`);
    }
})

app.post('/auth/reg', async (req,res) => {
    try{
        const data = req.body;
        const user = new User({username: data.username, password: data.password, avatar:data.avatar, cover:data.cover});
        await user.save();
        res.json(user);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
})

app.post('/auth/login', async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({username: data.username, password: data.password});
        if(user){
            res.json(user);
        } else {
            res.json({error:"User not found"});
        }
    } catch (err){
        console.log(`Error: ${err}`);
    }
})

app.get('/getposts', async (req,res) => {
    try{
        const posts = await Post.find({});
        res.json({posts});
    } catch(err){
        console.log(`Error: ${err}`);
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
    mongoose.connect(`mongodb+srv://admin1:admin1@gau.zwcf79d.mongodb.net/`)
    .then(() => {console.log("Database connected");})
    .catch(err => console.log(err));
})