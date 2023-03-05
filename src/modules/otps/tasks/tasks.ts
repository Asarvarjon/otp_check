import { calculateTempBlockEndTime, generateRandomDigit, getCurrentDate } from '../../../modules/shared/utils/utils'; 
import OtpDAO from '../dao/otps.dao';
import cron from 'node-cron';


export default class TasksService { 

    private otpsDao = new OtpDAO()

    async taskForCron() {
        console.log('Cron is working...');
        
            await this.unblockTemporaryBlockedUserOtps()
            await this.deactivateAllExpiredCodes()
    }

    async unblockTemporaryBlockedUserOtps() {  
        const data = await this.otpsDao.unblockTemporaryBlocked();        
        return data
    }  

    async deactivateAllExpiredCodes() {  
        const expireCodes = await this.otpsDao.findAllExpiredCodes();

        console.log(expireCodes)

        expireCodes.map(async(code) => {
            await this.otpsDao.deactivateOtpById(code.id)
        })
        
        return expireCodes
    }  
}