import isEmpty from "lodash/isEmpty";
import validator from "validator";
export function ValidateInput(data) {
  let errors = {};

  if (data.user_name !== undefined && validator.isEmpty(data.user_name)) {
    errors.user_name = "Username is required";
  }

    // if (data.user_name !== undefined && validator.isEmpty(data.user_name)===false) {
    //   if (!validator.matches(data.user_name, /^[a-zA-Z ]*$/)) {
    //     errors.user_name = "Only Alphabets Allowed";
    //   }
    // }

  if (data.password !== undefined && validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (data.password !== undefined && !validator.isEmpty(data.password)) {
    if (
      data.password !== undefined &&
      validator.isLength(data.password, { min: 6 }) === false
    ) {
      errors.password = "Passowrd should be minimum of 6 charcter";
    } else {
      var pattern = new RegExp(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,19}$/
      );
      if (
        data.password !== undefined &&
        pattern.test(data.password) === false
      ) {
        errors.password =
          "Password must include at least a number, an uppercase and a lowercase letter";
      }
    }
    //  if(validator.matches()===false)
  }
  return { errors, isValid: isEmpty(errors) };
}
