import { IRequestOtp } from './../interface/otps.interface';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator'; 
import { IConfirmOtp } from '../interface/otps.interface';
 
export class RequestOtpDTO implements IRequestOtp {
  @IsDefined()
  @IsNotEmpty() 
  @IsPhoneNumber()
  phone: string;  
}

export class ConfirmOtpDTO implements IConfirmOtp {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  phone: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  code: number;

}

export class ResendOtpDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  phone: string; 
}