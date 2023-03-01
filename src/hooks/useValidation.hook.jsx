/* eslint-disable no-else-return */
/* eslint-disable operator-linebreak */
import * as EmailValidator from 'email-validator';
import usePalette from './usePalette.hook';

// validations:
const validateEmailColor = (email = '') => {
  const Palette = usePalette();
  if (email.toString() === '') {
    return Palette.Primary;
  } else if (EmailValidator.validate(email) && email.toString() !== '') {
    return Palette.Primary;
  } else return Palette.Red;
};

const validatePasswordColor = (password = '') => {
  const Palette = usePalette();
  if (password.toString() === '') {
    return Palette.Primary;
  } else if (password.toString() !== '' && password.toString().length >= 6) {
    return Palette.Primary;
  } else return Palette.Red;
};

const validateConPasswordColor = (password1 = '', password2 = '') => {
  const Palette = usePalette();
  if (password2.toString() === '') {
    return Palette.Primary;
  } else if (password2 === password1 && password2.toString().length >= 0) {
    return Palette.Primary;
  } else return Palette.Red;
};

const validateNameColor = (name = '') => {
  const Palette = usePalette();
  if (name.toString() === '') {
    return Palette.Primary;
  } else if (name.toString() !== '') {
    return Palette.Primary;
  } else return Palette.Red;
};

const validateUpdatePasswordColor = (password = '') => {
  const Palette = usePalette();
  if (password.toString() === '') {
    return Palette.Primary;
  } else if (password.toString() !== '' && password.toString().length >= 6) {
    return Palette.Primary;
  } else return Palette.Red;
};

const validateSignInFormSubmit = (email = '', password = '') => {
  if (
    EmailValidator.validate(email) &&
    email.toString() !== '' &&
    password.toString() !== '' &&
    password.toString().length > 5
  ) {
    return false;
  } else return true;
};

const validateCreateAccFormSubmit = (
  fname = '',
  lname = '',
  email = '',
  password = '',
  conPassword = '',
  TOUchecked = Boolean
) => {
  if (
    fname.toString() !== '' &&
    lname.toString() !== '' &&
    email.toString() !== '' &&
    password.toString() !== '' &&
    password.toString().length >= 6 &&
    conPassword.toString() !== '' &&
    TOUchecked
  ) {
    return false;
  } else return true;
};

const validateForgotPasswordFormSubmit = (email = '') => {
  if (EmailValidator.validate(email) && email.toString() !== '') {
    return false;
  } else return true;
};

const validateUpdatePasswordSubmit = (password = '', newpassword = '') => {
  if (
    password.toString() !== '' &&
    password.toString().length > 5 &&
    newpassword.toString() !== '' &&
    newpassword.toString().length > 5 &&
    password.toString() !== newpassword.toString()
  ) {
    return false;
  } else return true;
};

const validateAddressFormSubmit = (ereg = '', ecit = '', edis = '') => {
  if (ereg.toString() !== '' && ecit.toString() !== '' && edis.toString() !== '') {
    return false;
  } else return true;
};

export {
  validateNameColor,
  validateEmailColor,
  validatePasswordColor,
  validateSignInFormSubmit,
  validateCreateAccFormSubmit,
  validateConPasswordColor,
  validateForgotPasswordFormSubmit,
  validateUpdatePasswordColor,
  validateUpdatePasswordSubmit,
  validateAddressFormSubmit,
};
