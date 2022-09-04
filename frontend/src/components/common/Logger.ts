export const Log = (text: string, data?: any) => {
  return console.log(text ? text : '', data ? data : '');
};
export const ErrorLog = (text: string, data?: any) => {
  return console.error(text ? text : '', data ? data : '');
};
