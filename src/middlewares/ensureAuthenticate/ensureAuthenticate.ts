import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;
    if(!authHeader){
        return response.status(401).json({
            message: 'Token required',
        });
    }
    console
    const token = authHeader.split(' ')[1];
    try {
        const {sub} = verify(token, 'secretIOT');
        
        next();
    } catch (error) {
        throw new AppError('Token invalid', 401);
    }
}