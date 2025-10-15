import jwt from "jsonwebtoken";
import { IUser } from "../types/user.types";

export const generateJwtToken = (user: IUser) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");
  if (!user.id) throw new Error("User id is missing");

  return jwt.sign({ id: user.id }, secret, { expiresIn: "7d" });
};
