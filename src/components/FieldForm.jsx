import { ErrorMessage, Field } from "formik";
import React from "react";

const FieldForm = ({ formikProps, name, type, placeholder, label }) => {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className="text-customBlue mb-0.5 text-sm font-semibold"
      >
        {label}
      </label>
      <Field
        as="input"
        type={type}
        name={name}
        placeholder={placeholder}
        className={`outline-none border placeholder:text-sm rounded border-neutral-300 p-2 w-full ${
          type === "number" &&
          "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        } `}
      />
      {formikProps.errors[name] && formikProps.touched[name] && (
        <span className="span w-full" style={{ color: "red" }}>
          <ErrorMessage name={name} />
        </span>
      )}
    </div>
  );
};

export default FieldForm;
