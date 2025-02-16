import React from "react";
import style from "./button.module.css";

const ButtonForm = ({ loading, formikProps }) => {
  return (
    <div className="flex flex-col w-full justify-center mb-5 mt-1">
      <button
        className={`p-2 rounded text-white ${
          !formikProps.values.amount ||
          formikProps.values.description.trim() === ""
            ? "bg-[#C6DFFE] cursor-not-allowed"
            : "bg-[#035AC5] hover:bg-[#357ABD] cursor-pointer"
        }`}
        disabled={
          !formikProps.values.amount ||
          formikProps.values.description.trim() === "" ||
          loading
        }
      >
        {loading ? <span className={style.loader}></span> : "Continuar"}
      </button>
    </div>
  );
};

export default ButtonForm;
