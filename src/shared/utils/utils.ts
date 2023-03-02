
export function generateRandomDigit(max: number) {
  return Math.round(Math.random() * 10 ** max)
    .toString()
    .padEnd(max, '0');
} 

export function getExpireDate(date: Date) {
  const dateTimestamp = new Date(date);
  return dateTimestamp.getTime() + (60 * 1000)
}

export function getDateByValue(date: number | Date) {
  return new Date(date);
}

export function getCurrentDate() {
  return Date.now();
} 