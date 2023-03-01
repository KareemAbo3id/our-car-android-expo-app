/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable no-else-return */
import * as EmailValidator from 'email-validator';

// Next Name
const nextNameValid = (fn, ln) => {
  if (fn.toString() !== '' && ln.toString() !== '') {
    return false;
  } else return true;
};

const nextEmailValid = (email) => {
  if (EmailValidator.validate(email) && email.toString() !== '') {
    return false;
  } else return true;
};

const nextPassValid = (password = '', newpassword = '') => {
  if (
    password.toString() !== '' &&
    newpassword.toString() !== '' &&
    password.toString().length >= 6 &&
    password.toString().length === newpassword.toString().length
  ) {
    return false;
  } else return true;
};

const nextCarValid = (reg, city, dis) => {
  if (reg.toString() !== '' && city.toString() !== '' && dis.toString() !== '') {
    return false;
  } else return true;
};

const nextAddressValid = (reg, city, dis) => {
  if (reg.toString() !== '' && city.toString() !== '' && dis.toString() !== '') {
    return false;
  } else return true;
};

export { nextNameValid, nextEmailValid, nextPassValid, nextCarValid, nextAddressValid };
