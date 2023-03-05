import { NextFunction, Request, Response } from "express";
import UserService from "./users.service";
import { CreateUserDTO } from "./dto/users.dto";

export default class UsersController {
    private usersService = new UserService()

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: CreateUserDTO = req.body


            const data = await this.usersService.create(userData)

            res.status(201).json({
                success: true,
                data,
                message: "User created successfully"
            })
        } catch (error) {
            next(error)
        }
    }
 

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { query } = req;  

            const data = await this.usersService.findAll()

            res.status(200).json({
                success: true,
                data
            })
        } catch (error) {
            next(error)
        }
    } 
}