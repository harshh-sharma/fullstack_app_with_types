import {Request, Response} from "express"
import prisma from "../config/db";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/generateJwt";
import { AuthRequest, LoginBody, RegisterBody } from "../types/user.types";

export const register = async (req:Request, res:Response) => {
    try {
        const {name, email, password} = req.body as RegisterBody;

        const isEmailExist = await prisma.user.findUnique({
            where:{email}
        });

        if(isEmailExist){
            return res.status(400).json({
                success:false,
                message:"Email already exist"
            })
        }

        const hasedPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hasedPassword
            }
        });

        const token = generateJwtToken(user);

        return res.status(200).json({
            success:true,
            message:"user successfully loggedIn",
            data:{user,token}
        })

    } catch (error:any) {
       return res.status(500).json({
        success:false,
        message:error?.message
       }) 
    }
}

export const login = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body as LoginBody;

        const user = await prisma.user.findUnique({
            where:{email}
        });

        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = generateJwtToken(user);

        return res.status(200).json({
            success:true,
            message:"user successfully loggedIn",
            data:{user,token}
        })
    } catch (error:any) {
          return res.status(500).json({
        success:false,
        message:error?.message
       })
    }
}

export const userProfile = async (req:AuthRequest, res:Response) => {
    try {
        console.log("ressdnl",req.user);
        
        const id = Number(req.user?.id);
       
        const user = await prisma.user.findUnique({
            where:{id}
        })

        if(!user){
            return  res.status(404).json({
                success:false,
                message:"user not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"user profile successfully get",
            data:user
        })
    } catch (error:any) {
    return res.status(500).json({
        success:false,
        message:error?.message
       })
    }
}