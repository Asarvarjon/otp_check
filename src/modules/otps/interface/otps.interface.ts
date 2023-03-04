export interface IUserOtp {
  id: string; 
  user_id: string;
  request_count: number; 
  fail_count: number;
  temporary_blocked: Boolean;
  temp_block_end_time: Date;
  permanent_blocked: Boolean;
}

export interface ICreateUserOtp { 
  user_id: string; 
}

export interface IUpdateUserOtp { 
  user_id?: string;
  request_count?: number; 
  fail_count?: number;
  temporary_blocked?: Boolean;
  temp_block_end_time?: Date;
  permanent_blocked?: Boolean;
}

export interface IOtpCode {
  id: string;
  code: number;
  otp_id: string;
  sent_time: Date;
}

export interface ICreateOtpCode {
  code: number;
  otp_id: string;
}

export interface IConfirmOtp {
  code: number;
  phone: string;
}


export interface IRequestOtp { 
  phone: string;
}
