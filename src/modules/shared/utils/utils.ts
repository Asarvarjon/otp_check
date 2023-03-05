import { OtpConfig } from './../../../config/conf';
export function getFirst(v: any[]) {
  return v[0];
}

export function generateRandomDigit(max: number) {
  return Math.round(Math.random() * 10 ** max)
    .toString()
    .padEnd(max, '0');
} 

export function getExpireDate(sent_time) {  
  const expiryTime = sent_time.getTime() + Number(OtpConfig.otp_exp_time) * 60 * 1000
  return expiryTime;
}


export function getDateByValue(date: number | Date) {
  return new Date(date);
}

export function getCurrentDate() {
  return new Date(Date.now()).getTime()

} 
 

export function calculateTempBlockEndTime() {
  const now = new Date(); // current date and time
  const blockEnd = new Date(now.getTime() + Number(OtpConfig.temp_block_duration) * 60 * 1000); // add blockTime minutes (converted to seconds) to current time
  return blockEnd;
}


export function isOtpExpired(sentTime) {
  const now = new Date();
  
  const expireTime = sentTime.getTime() + (Number(OtpConfig.otp_exp_time)* 60 * 1000);
   
  return now.getTime() > expireTime;
}
