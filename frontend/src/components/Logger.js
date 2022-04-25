export const Log = (text, data) => {
  return console.log(text ? text : '', data ? data : '');
};
export const ErrorLog = (text, data) => {
  return console.error(text ? text : '', data ? data : '');
};
