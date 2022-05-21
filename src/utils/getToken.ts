/* eslint-disable no-const-assign */
import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

function loadOcgaasUser() {
  try {
    let a = localStorage.getItem('_kym_user_cache_') || localStorage.getItem('_user_cache_');
    let b = a.length;
    b % 4 !== 0 && (a = a.padEnd(b + 4 - (b % 4), ' '));
    try {
      return window
        .atob(a)
        .split('+')
        .map(function (c, a, b) {
          return a <= 0 ? Number(c) / 2 : b[a - 1] - Number(c);
        })
        .map(function (a) {
          return String.fromCharCode(a);
        })
        .join('');
    } catch (c) {
      return console.log(c), !1;
    }
  } catch (error) {
    return null;
  }
}

export function getToken() {
  let token = localStorage.getItem('token');
  let ocgaasUser = loadOcgaasUser();
  if (ocgaasUser) {
    ocgaasUser = JSON.parse(ocgaasUser);
    const ocgaasToken = ocgaasUser.data.accessToken;
    token = ocgaasToken;
  }
  return token;
}
