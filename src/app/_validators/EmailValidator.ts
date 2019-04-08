import {FormControl, Validator, ValidatorFn} from '@angular/forms';

export class EmailValidator implements Validator {
  validator: ValidatorFn;
  static emailValidator(): ValidatorFn {
    return (c: FormControl) => {
      const isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(c.value);
      if (isValid) {
        return null;
      } else {
        return {
          emailvalidator: {
            valid: false
          }
        };
      }
    };
  }

  public validate(c: FormControl) {
    return this.validator(c);
  }
}
