import User from "../models/user";
import {hashPassword, comparePassword} from "../helpers/auth";
import jwt from 'jsonwebtoken';



export const register = async (req,res) => {
    // console.log('Register endpoint =>', req.body);
    const {name, email, password, secret, username} = req.body;
    // validation
    if(!name) {return res.json({error:'Name is required'});}
    if(!password || password.length < 6) {return res.json({error:'Password is required and should be 6 or more characters'});}
    if(!secret) {return res.json({error:'Secret is required'});}
    const existEmail = await User.findOne({ email });
    if(existEmail)  {return res.json({error:'Email is taken'});}
    const existUsername = await User.findOne({ username });
    if(existUsername)  {return res.json({error:'Username is taken'});}
    //hash password
    const hashedPassword = await hashPassword(password);

    const user = new User({name, email, password:hashedPassword, secret, username});

    try {
        await user.save();
        return res.json({
            ok: true, 
        })

    } catch(err){
        console.log('Registration failed =>' , err);
        return res.status(400).send('Error. Try again');
    }
};

export const login = async (req, res) => {
    console.log(res.body)
    try{
        const  {email, password} = req.body;
        const user = await User.findOne({ email });
        if(!user)  {return res.json({error:'No User found'});}
        const match = await comparePassword(password, user.password);
        if(!match)  {return res.json({error:'Wrong password'});}
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
        user.password = undefined;
        user.secret = undefined;
        res.json({
            token, user,
        })
    } catch (err) {
        console.log(err)
        return res.status(400).send('Error. Try again.');
    }
};

export const currentUser = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        res.json({ok:true});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
};
