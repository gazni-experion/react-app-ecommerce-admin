import React, { useEffect } from "react";

export const ValidatePassword = (errors, condition, touched, values) => {
  useEffect(() => {
    console.log(errors);
    console.log(!values);
    console.log(values.length);
  }, [values, errors]);

  if (errors && touched && condition) {
    if (errors && !errors.includes(condition)) {
      return "valid";
    } else {
      return "invalid";
    }
  } else if (touched && errors === undefined && values.length > 1) {
    return "valid";
  } else {
    return null;
  }
};
