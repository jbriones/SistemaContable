import chileanRut from 'chilean-rut';

export function validateRut(rut) {
  return chileanRut.validate(rut);
}

export function formatRut(rut) {
  if (!rut) {
    return '';
  }
  const part1 = chileanRut.format(rut.substring(0, rut.length - 1));
  const dv = rut.substring(rut.length - 1, rut.length);
  if (dv === '-') {
    return part1;
  }
  return `${part1}-${dv}`;
}

export function validateEmail(email) {
  const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!email) {
    return false;
  }
  if (email.length > 254) {
    return false;
  }
  const valid = tester.test(email);
  if (!valid) {
    return false;
  }
  // Further checking of some things regex can't handle
  const parts = email.split('@');
  if (parts[0].length > 64) {
    return false;
  }
  const domainParts = parts[1].split('.');
  if (domainParts.some((part) => part.length > 63)) {
    return false;
  }
  return true;
}

export default {
  validateRut,
  formatRut,
  validateEmail,
};

