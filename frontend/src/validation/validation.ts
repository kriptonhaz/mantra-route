import * as Yup from 'yup';
import nric from 'nric';
import dayjs from 'dayjs';
import {AnyObject, Maybe} from 'yup/lib/types';

Yup.addMethod(Yup.string, 'postalCode', function (err = 'Please provide a valid postal code') {
  return this.test('postalCode', err, (str) => {
    return str?.length === 6 ? !isNaN(parseInt(str)) : str?.length ? false : true;
  });
});

Yup.addMethod(Yup.string, 'address', function (err = 'Please provide a valid address') {
  return this.test('address', err, (str) => {
    return str?.length ? /[a-zA-Z]+/.test(str) : true;
  });
});

Yup.addMethod(Yup.string, 'unitNumber', function (err = 'Please provide a valid unit number') {
  return this.test('unitNumber', err, (str) => {
    return str?.length ? str.length <= 10 : true;
  });
});

Yup.addMethod(Yup.string, 'nric', function (err = 'Please provide a valid id number') {
  return this.test('nric', err, (str) => {
    if (str?.length === 0) {
      return true;
    }
    if (str?.length !== 9) {
      return false;
    } else {
      str = str?.toUpperCase();
      const condition = nric.validate(str);
      if (condition) {
        return true;
      } else {
        return false;
      }
    }
  });
});

Yup.addMethod(Yup.string, 'uen', function (err = 'Please provide a valid id number') {
  // @ts-ignore
  return this.test('uen', err, (str) => {
    if (!str) return true;
    if (str.length === 0) {
      return true;
    }
    if (![9, 10].includes(str.length)) {
      return false;
    } else {
      const entityTypeIndicator = [
        'LP',
        'LL',
        'FC',
        'PF',
        'RF',
        'MQ',
        'MM',
        'NB',
        'CC',
        'CS',
        'MB',
        'FM',
        'GS',
        'GA',
        'GB',
        'DP',
        'CP',
        'NR',
        'CM',
        'CD',
        'MD',
        'HS',
        'VH',
        'CH',
        'MH',
        'CL',
        'XL',
        'CX',
        'RP',
        'TU',
        'TC',
        'FB',
        'FN',
        'PA',
        'PB',
        'SS',
        'MC',
        'SM',
      ];
      const uen = str?.toUpperCase();
      const uenStrArray = uen?.split('');

      // (A) Businesses registered with ACRA
      if (uenStrArray?.length === 9) {
        // check that last character is a letter
        if (!isNaN(parseInt(uenStrArray[uenStrArray.length - 1]))) {
          return false;
        }

        for (let i = 0; i < uenStrArray.length - 1; i++) {
          // check that first 8 letters are all numbers
          if (isNaN(parseInt(uenStrArray[i]))) {
            return false;
          }
        }

        // (A) Businesses registered with ACRA (SUCCESS)
        return true;
      } else if (uenStrArray?.length === 10) {
        // check that last character is a letter
        if (!isNaN(parseInt(uenStrArray[uenStrArray.length - 1]))) {
          return false;
        }

        // (B) Local companies registered with ACRA
        if (
          !isNaN(parseInt(uenStrArray[0])) &&
          !isNaN(parseInt(uenStrArray[1])) &&
          !isNaN(parseInt(uenStrArray[2])) &&
          !isNaN(parseInt(uenStrArray[3]))
        ) {
          // check that 5th to 9th letters are all numbers
          if (
            !isNaN(parseInt(uenStrArray[4])) &&
            !isNaN(parseInt(uenStrArray[5])) &&
            !isNaN(parseInt(uenStrArray[6])) &&
            !isNaN(parseInt(uenStrArray[7])) &&
            !isNaN(parseInt(uenStrArray[8]))
          ) {
            // (B) Local companies registered with ACRA (SUCCESS)
            return true;
          } else {
            return false;
          }
        }
        // (C) All other entities which will be issued new UEN
        else {
          // check that 1st letter is either T or S or R
          if (uenStrArray[0] !== 'T' && uenStrArray[0] !== 'S' && uenStrArray[0] !== 'R') {
            return false;
          }

          // check that 2nd and 3rd letters are numbers only
          if (isNaN(parseInt(uenStrArray[1])) || isNaN(parseInt(uenStrArray[2]))) {
            return false;
          }

          // check that 4th letter is an alphabet
          if (!isNaN(parseInt(uenStrArray[3]))) {
            return false;
          }

          // check entity-type indicator
          let entityTypeMatch = false;
          const entityType = String(uenStrArray[3]) + String(uenStrArray[4]);
          for (let j = 0; j < entityTypeIndicator.length; j++) {
            if (String(entityTypeIndicator[j]) === String(entityType)) {
              entityTypeMatch = true;
            }
          }
          if (!entityTypeMatch) {
            return false;
          }

          // check that 6th to 9th letters are numbers only
          if (
            isNaN(parseInt(uenStrArray[5])) ||
            isNaN(parseInt(uenStrArray[6])) ||
            isNaN(parseInt(uenStrArray[7])) ||
            isNaN(parseInt(uenStrArray[8]))
          ) {
            return false;
          }

          // (C) All other entities which will be issued new UEN (SUCCESS)
          return true;
        }
      }
    }
  });
});

Yup.addMethod(Yup.string, 'alphabet', function () {
  return this.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field');
});

Yup.addMethod(Yup.string, 'password', function () {
  return this.required().min(8).max(25);
});

Yup.addMethod(Yup.mixed, 'fileSize', function (err = 'File size too large') {
  return this.test('fileSize', err, (value) => {
    if (value) {
      return value.size <= 10000000;
    }
    return true;
  });
});

Yup.addMethod(Yup.string, 'dob', function (err = 'Birthday is invalid') {
  return this.test('dob', err, function (initValue) {
    console.log('🚀 ~ file: validation.ts:205 ~ initValue:', initValue);
    const value = dayjs(initValue).format('DD-MM-YYYY');
    if (value === '' || value === null) {
      return false;
    } else if (dayjs(value, 'DD-MM-YYYY') > dayjs()) {
      return false;
    } else if (
      dayjs(value, 'DD-MM-YYYY') < dayjs('1970-01-01') ||
      !dayjs(value, 'DD-MM-YYYY').isValid()
    ) {
      return false;
    } else {
      return true;
    }
  });
});

Yup.addMethod(Yup.string, 'contact', function (err = 'Contact number is invalid') {
  return this.test('contact', err, function (value) {
    const contactPattern = /^[689]\d{7}$/i;

    if (value && value.length > 0) {
      return contactPattern.test(value!);
    }
    return true;
  });
});

Yup.addMethod(Yup.string, 'mobileNumber', function (err = 'Mobile number is invalid') {
  return this.test('mobile', err, function (value) {
    const mobilePattern = /^[89]\d{7}$/i;

    if (value!.length > 0) {
      return mobilePattern.test(value!);
    }
    return true;
  });
});

Yup.addMethod(Yup.string, 'homePhone', function (err = 'Home phone is invalid') {
  return this.test('home', err, function (value) {
    const homePattern = /^[6]\d{7}$/i;

    if (value!.length > 0) {
      return homePattern.test(value!);
    }
    return true;
  });
});

Yup.addMethod(
  Yup.string,
  'fileExtensions',
  function (errMessage = "Uploaded file doesn't valid", extensions) {
    return this.test('fileExtensions', errMessage, (value) => {
      if (value) {
        // @ts-ignore
        const arrName = value.name.split('.');
        const extension = arrName[arrName?.length - 1];
        return extensions.includes(extension);
      }
      return true;
    });
  },
);

export const validateFile = (value: any) => {
  if (value) {
    return value.size <= 10000000;
  }
  return true;
};

export const validateFileExtension = (value: any, ...extensions: any[]) => {
  if (value) {
    const arrName = value.name?.split('.');
    const extension = arrName[arrName?.length - 1];
    return extensions.includes(extension);
  }
  return true;
};

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends Yup.BaseSchema<TType, TContext, TOut> {
    alphabet(): StringSchema<TType, TContext>;
    password(): StringSchema<TType, TContext>;
    nric(): StringSchema<TType, TContext>;
    postalCode(): StringSchema<TType, TContext>;
    address(): StringSchema<TType, TContext>;
    unitNumber(): StringSchema<TType, TContext>;
    uen(): StringSchema<TType, TContext>;
    contact(): StringSchema<TType, TContext>;
    dob(): StringSchema<TType, TContext>;
    mobileNumber(): StringSchema<TType, TContext>;
    homePhone(): StringSchema<TType, TContext>;
  }

  interface MixedSchema<TType = any, TContext = AnyObject> {
    fileSize(): MixedSchema<TType, TContext>;
    fileExtension(): this;
  }
}

export default Yup;
