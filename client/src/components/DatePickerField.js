import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

//https://stackoverflow.com/questions/56312372/react-datepicker-with-a-formik-form/58650742
