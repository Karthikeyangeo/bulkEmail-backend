import express from "express";
import bcrypt from "bcrypt"; 
import jwt from 'jsonwebtoken';


import { createUsers,genPassword,getUserByName } from "../userHelper.js";
const router = express.Router();



//signup process
router
    .route("/signup")
    .post(async(request,response)=>{
        //POST Method
        const  {username,password} = request.body;
        
        const isUserExist  = await getUserByName(username);
        //checking whether the username already exists
        if(isUserExist)
        {
            response.status(400).send({message: "Username already exists"});
            return;
        }
        //Password strength checking
        if(
            !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)
        ){
            response.status(400).send({message: "Password pattern did not match"});
            return;
        }

        const hashedPassword = await genPassword(password);

        const result = await createUsers({username:username,password:hashedPassword});
    
        response.status(200).send({message:'User Registered successfully'})
    });

//signin process
router
    .route("/login")
    .post(async(request,response)=>{
        //POST Method
        const  {username,password} = request.body;
        

        const userFromDB  = await getUserByName(username);
        //checking whether the username already exists
        if(!userFromDB)
        {
            response.status(401).send({message: "Invalid Credentials"});
            return;
        }

        const storedPassword = userFromDB.password;
        const isPasswordMatch = await bcrypt.compare(password,storedPassword);
        console.log(storedPassword);

        if(isPasswordMatch){
            // issue the token
            const token = jwt.sign({id:userFromDB._id}, process.env.SECRET_KEY);
            response.send({message:"Successful login", token:token});
        }
        else{
            response.status(401).send({message: "Invalid Credentials"});
        }
        
    });


export const usersRouter = router;