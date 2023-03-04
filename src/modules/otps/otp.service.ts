import { ICreateUserOtp, IUserOtp, ICreateOtpCode, IUpdateUserOtp, IOtpCode } from './interface/otps.interface';
import UserService from "../../modules/users/users.service";
import ErrorResponse from "../shared/utils/errorResponse"; 
import OtpsDAO from "./dao/otps.dao"; 
import { calculateTempBlockEndTime, generateRandomDigit } from '../../modules/shared/utils/utils';

export default class OTPService {
  private OtpDigitsCount = 5;

  private usersService = new UserService(); 
  private otpsDao = new OtpsDAO();  

  async createUserOtp(userOtpData: ICreateUserOtp) { 
    const data: IUserOtp = await this.otpsDao.createUserOtp(userOtpData)
    return data
  } 

  async createOtpCode(user_otp_id: string) { 
    const code = generateRandomDigit(this.OtpDigitsCount)

    const data: IOtpCode = await this.otpsDao.createOtpCode({
      otp_id: user_otp_id,
      code: Number(code)
    });

    const increasedCount = await this.increaseRequestCount(user_otp_id);
    
    return data
  }  

  async findUserOtpByUserId(user_id: string) {
    const data: IUserOtp = await this.otpsDao.findUserOtpByUserId(user_id);
    return data
  }

  async getLastOtpCode(id: string) {
    const data = await this.otpsDao.getLastOtpCode(id);
    return data
  }

  async deactivateOtpById(id: string) {
    const data = await this.otpsDao.deactivateOtpById(id);
    return data
  }

  async blockTemporary(otp_id: string) {
    const temp_block_end_time = calculateTempBlockEndTime()

    const data = await this.otpsDao.blockTemporary(otp_id, temp_block_end_time);
    return data
  }

  async blockPermanent(otp_id: string) { 
    const data = await this.otpsDao.blockPermanent(otp_id);
    return data
  }

  async increaseRequestCount(id: string) { 
    const data: IUserOtp = await this.otpsDao.increaseRequestCount(id);
    return data
  }


  async increaseFailCount(id: string) { 
    const data: IUserOtp = await this.otpsDao.increaseFailCount(id);
    return data
  }


  async update(otp_id: string, values: IUpdateUserOtp) { 
    const data: IUserOtp = await this.otpsDao.update(otp_id, values);
    return data
  }
}