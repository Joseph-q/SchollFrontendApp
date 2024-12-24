import { PhoneNumber } from "../interface/phone-number.interface";

export const FormatPhoneNumber = (number: string): PhoneNumber => {
  // Dividir el número en partes específicas: 3-3-2-2
  const part1 = number.substring(0, 3);
  const part2 = number.substring(3, 6);
  const part3 = number.substring(6, 10);

  //example 231 888 90 01
  return {
    area: part1,
    exchange: part2,
    subscriber: part3,
  };
};




export const FormatNumberToString = (number: PhoneNumber): string => {
  return number.area + number.exchange + number.subscriber;
};
