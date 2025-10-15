import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/user.types";

export const isUserAuthenticated = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // Cast req.headers to the correct type
        const authHeader = (req.headers['authorization'] || req.headers['Authorization']) as string | undefined;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            return res.status(500).json({ success: false, message: "JWT secret not defined" });
        }

        // jwt.verify returns any by default; you can type it
        const decoded = jwt.verify(token, secret) as { id: number };

        req.user = { id: decoded.id }; // assign id to your custom AuthRequest.user

        next();
    } catch (error: any) {
        console.log("error",error);
        
        return res.status(401).json({ success: false, message: error.message || "Unauthorized" });
    }
};
