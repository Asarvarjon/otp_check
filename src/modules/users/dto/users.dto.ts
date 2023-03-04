import { IsDefined, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";
import { ICreateUser } from "../interface/users.interface";

export class CreateUserDTO implements ICreateUser {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    phone: string; 
} 