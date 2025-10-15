import {Request} from "express";
interface IUser{
    id?: number;
    name?:string;
    email:string;
    password:string
}

interface RegisterBody {
    name: string;
    email: string;
    password: string;
}

interface LoginBody {
    email: string;
    password: string;
}

interface AuthRequest extends Request {
    user?: { id: number };
}


export {
    IUser,
    RegisterBody,
    LoginBody,
    AuthRequest
}