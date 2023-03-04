import KnexService from '../../../database/connection';
import { getFirst } from "../../shared/utils/utils";
import { ICreateUser } from "../interface/users.interface";

export default class UsersDAO {
    async create(userData: ICreateUser) {
        return getFirst(
            await KnexService('users')
            .insert(userData)
            .returning("*")
        )
    } 

    async getByPhone(phone: string) {
        return getFirst(
            await KnexService('users')
            .select(["id", "phone"])
            .where({phone: phone})
        )
    } 

    async getAll() { 
        return await KnexService('users')  
    } 
}