import { ICreateUserOtp, ICreateOtpCode } from './../interface/otps.interface';
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils'; 

export default class OtpDAO {

  async createUserOtp(data: ICreateUserOtp) {
    return getFirst(
      await KnexService('user_otps')
        .insert(data)
        .returning('*'),
    );
  };


  async findUserOtpByUserId(user_id: string) {
    return getFirst(
      await KnexService('user_otps')  
      .where({
        user_id
      })
    );
  } 

  
 async blockTemporary(otp_id: string, temp_block_end_time ) {
    return await KnexService('user_otps')
      .update({
          temp_block_end_time: temp_block_end_time,
          temporary_blocked: true
        })
      .where('id', otp_id)
      .returning('*');
  }

 async increaseRequestCount(id: string) {
    return getFirst(
      await KnexService('user_otps')
      .update({ 
          request_count: KnexService.raw('request_count + 1')
      })
      .where('id', id)
      .returning('*')
    )
  }

  async increaseFailCount(id: string) {
    return getFirst(
      await KnexService('user_otps')
      .update({ 
          request_count: KnexService.raw('fail_count + 1')
      })
      .where('id', id)
      .returning('*')
    )
  }

 async update(otp_id: string, values ) {
    return getFirst(
      await KnexService('user_otps')
      .update(values)
      .where('id', otp_id)
      .returning('*')
    )
  }

 async blockPermanent(otp_id: string ) {
    return getFirst(
      await KnexService('user_otps')
      .update({ 
          permanent_blocked: true
        })
      .where('id', otp_id)
      .returning('*')
    )
  }

  async createOtpCode(data: ICreateOtpCode) {
    return getFirst(
      await KnexService('otp_codes')
        .insert(data)
        .returning('*'),
    );
  }

  async getLastOtpCode(id: string) {
    return getFirst(
      await KnexService('otp_codes')
        .where({ opt_id: id, is_active: true })
    );
  } 

  async deactivateOtpById(id: string) {
    return await KnexService('otp_codes')
      .update({ is_active: false })
      .where('id', id)
      .returning('*');
  }

}
