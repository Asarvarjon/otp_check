import { isEmpty } from "lodash";
import ErrorResponse from "../shared/utils/errorResponse";
import UsersDAO from "./dao/users.dao"; 
import { IUser, ICreateUser } from "./interface/users.interface";

export default class UserService {
    private usersDao = new UsersDAO()

    async create(userData: ICreateUser) {
        const foundUser = await this.usersDao.getByPhone(userData.phone); 

        if (foundUser) {
          throw new ErrorResponse(400, "This user already exists");
        }

        const user: IUser = await this.usersDao.create(userData)
        
        return user
    } 

    async findAll() {
        const users = await this.usersDao.getAll();
        return users
    } 

    async findByPhone(phone: string) {
        const user: IUser = await this.usersDao.getByPhone(phone);
        return user
    }
 
}