import validator from "validator";
import isEmpty from "lodash/isEmpty";

export function ValidateInput(data) {
  let errors = {};

  console.log("Email", data);
  if (data.first_name !== undefined && validator.isEmpty(data.first_name)) {
    errors.first_name = "FirstName is required";
  }

  if (data.last_name !== undefined && validator.isEmpty(data.last_name)) {
    errors.last_name = "LastName is required";
  }
  if (data.email !== undefined && validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (data.email !== undefined && validator.isEmpty(data.email) === false) {
    if (!validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }
  if (data.phone !== undefined && validator.isEmpty(data.phone)) {
    errors.phone = "Phone number is required";
  }
  if (data.phone !== undefined && !validator.isEmpty(data.phone)) {
    if (!validator.isNumeric(data.phone)) {
      errors.phone = "Enter valid phone no";
    }
    if (
      data.phone !== undefined &&
      validator.isNumeric(data.phone) &&
      validator.isLength(data.phone, { min: 10, max: 10 }) === false
    ) {
      errors.phone = "Phone no should be of 10 digit";
    }
  }

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
