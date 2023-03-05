import { IUserOtp, IOtpCode } from './interface/otps.interface';
import { ICreateUser } from './../users/interface/users.interface';
import { NextFunction, Request, Response } from "express"; 
import UserService from "../../modules/users/users.service";
import OTPService from './otp.service';
import ErrorResponse from '../../modules/shared/utils/errorResponse';
import { OtpConfig } from '../../config/conf';
import { getCurrentDate, getExpireDate, isOtpExpired } from '../../modules/shared/utils/utils';


export default class OtpsController {
    private usersService = new UserService()
    private otpsService = new OTPService()
    

    public requestOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try { 
            const { phone }: ICreateUser = req.body
            
            let user = await this.usersService.findByPhone(phone);

            if(!user) {
                throw new ErrorResponse(400, 'User not found')
            };

            let userOtp: IUserOtp = await this.otpsService.findUserOtpByUserId(user.id);

            if(!userOtp) {
                userOtp = await this.otpsService.createUserOtp({
                    user_id: user.id
                })
            };

            if(userOtp.permanent_blocked) {
                throw new ErrorResponse(400, 'You are permanently blocked, Please contact to the support!')
            }

            const lastSendOtp = await this.otpsService.getLastOtpCode(userOtp.id);
            
            if(lastSendOtp && !isOtpExpired(lastSendOtp.sent_time)) { 
                res.status(400).json({message:"Cannot send, last one is active"})

                return
            };
 

            if(Number(userOtp.request_count) === Number(OtpConfig.req_temp_limit)) {
                await this.otpsService.blockTemporary(userOtp.id);
                res.status(429).json({
                    success: false,
                    message: "Too many requests, try later",
                })

                return;
            }

            if(Number(userOtp.request_count) >= Number(OtpConfig.req_perm_limit)) {
                await this.otpsService.blockPermanent(userOtp.id)

                await this.otpsService.update(userOtp.id, {
                    request_count: 0
                })

                res.status(429).json({
                    success: false,
                    message: "Please, contact to the support. You are permanently blocked!",
                })

                return;
            };

            const sendOtp: IOtpCode = await this.otpsService.createOtpCode(userOtp.id);
        

            res.status(200).json({
                success: true,
                message: "OTP sent successfully",
                otp: sendOtp.code
            })


        } catch (error) {
            next(error)
        }
    }

    public confirm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try { 
            const {code, phone} = req.body;

            let user = await this.usersService.findByPhone(phone);

            if(!user) {
                throw new ErrorResponse(400, 'User not found')
            };

            let userOtp: IUserOtp = await this.otpsService.findUserOtpByUserId(user.id);

            // Reset {request_count} to 0;
            await this.otpsService.update(userOtp.id,{
                request_count: 0
            });

            const lastSendOtp = await this.otpsService.getLastOtpCode(userOtp.id);

            if(lastSendOtp && lastSendOtp.code === code && !isOtpExpired(lastSendOtp.sent_time)) {
                await this.otpsService.update(userOtp.id,{
                    fail_count: 0
                });

                await this.otpsService.deactivateOtpById(lastSendOtp.id)

                res.status(200).json({
                    success: true,
                    message: "Success", 
                });

                return
            };


            let newUserOtp = await this.otpsService.increaseFailCount(userOtp.id);
            

            if(Number(newUserOtp.fail_count) === Number(OtpConfig.fail_temp_limit)) {
                await this.otpsService.blockTemporary(newUserOtp.id);

                res.status(429).json({
                    success: false,
                    message: "Too many requests, try later",
                })

                return;
            }else if(Number(newUserOtp.fail_count) >= Number(OtpConfig.fail_perm_limit)) {
                await this.otpsService.blockPermanent(newUserOtp.id)

                await this.otpsService.update(newUserOtp.id, {
                    fail_count: 0
                })

                res.status(429).json({
                    success: false,
                    message: "Please, contact to the support. You are permanently blocked!",
                })

                return;
            };

            res.status(400).json({ 
                succes: false,
                message: "Otp check failed",
            })


        } catch (error) {
            next(error)
        }
    }

    public resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try { 
            const { phone }: ICreateUser = req.body
            
            let user = await this.usersService.findByPhone(phone);

            if(!user) {
                throw new ErrorResponse(400, 'User not found')
            };

            let userOtp: IUserOtp = await this.otpsService.findUserOtpByUserId(user.id);

            const lastSendOtp: IOtpCode = await this.otpsService.getLastOtpCode(userOtp.id);

            if (!(getCurrentDate() >= getExpireDate(lastSendOtp.sent_time))) {
                throw new ErrorResponse(400, 'Cannot send, last one is active now')
            }

            const sendOtp: IOtpCode = await this.otpsService.createOtpCode(userOtp.id);

            res.status(200).json({
                success: true,
                message: "OTP sent successfully",
                otp: sendOtp.code
            })


        } catch (error) {
            next(error)
        }
    }

    public unBlockPermanentBlock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try { 
            const { phone }: ICreateUser = req.body
            
            let user = await this.usersService.findByPhone(phone);

            if(!user) {
                throw new ErrorResponse(400, 'User not found')
            };

            let userOtp: IUserOtp = await this.otpsService.findUserOtpByUserId(user.id);

            const unblocked = await this.otpsService.unblockPermanent(userOtp.id)

            
            res.status(200).json({
                success: true,
                message: "Unblocked succesfully", 
            })

        } catch (error) {
            next(error)
        }
    }
}
