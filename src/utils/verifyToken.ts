import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import VerifyToken from "../interfaces/user.interface";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your_refresh_secret";
export const verifyToken = (token: string): VerifyToken | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as VerifyToken;
    return decoded;
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};

export const verifyRefreshToken = (token: string): VerifyToken | null => {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as VerifyToken;
    return decoded;
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};