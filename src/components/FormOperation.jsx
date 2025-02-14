import { submitOrder } from "@/helpers/fetchOrders";
import { validateForm } from "@/helpers/validateForm";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

const FormOperation = ({
  selectedCurrency,
  setViewModalMoney,
  viewModalMoney,
}) => {
  const [error, setError] = useState(null);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const url = process.env.NEXT_PUBLIC_URL;
  const idDevice = process.env.NEXT_PUBLIC_ID_DEVICE;
  const router = useRouter()

  useEffect(() => {
    if (selectedCurrency) {
      setMinAmount(selectedCurrency.min_amount);
      setMaxAmount(selectedCurrency.max_amount);
    }
  }, [selectedCurrency]);
  return (
    <Formik
      initialValues={{
        amount: "",
        description: "",
      }}
      validate={(values) => validateForm(values, minAmount, maxAmount)}
      onSubmit={async (values) => {
        try {
          const response =  await submitOrder(url, idDevice, {...values, selectedCurrency})
           if(response) router.push(`/transaction?id=${response.identifier}`)
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {(formikProps) => (
        <Form className="flex flex-col items-start gap-5 w-full">
          <div className="flex flex-col w-full">
            <label
              htmlFor="amount"
              className="text-customBlue mb-0.5 text-sm font-semibold"
            >
              Importe a pagar
            </label>
            <Field
              as="input"
              type="number"
              name="amount"
              placeholder="Añade importe a pagar"
              className="outline-none border placeholder:text-sm rounded border-neutral-300 p-2 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            {formikProps.errors["amount"] && formikProps.touched["amount"] && (
              <span className="span w-full" style={{ color: "red" }}>
                <ErrorMessage name="amount" />
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-1">
              <label className="text-customBlue mb-0.5 text-sm font-semibold">
                Seleccionar moneda
              </label>
              <span className="text-customBlue font-extralight text-ms">
                <CiCircleInfo />
              </span>
            </div>
            <div className="flex justify-between border rounded border-neutral-300 p-2 w-full">
              {selectedCurrency && (
                <div className="flex gap-1 items-center">
                  <img
                    src={selectedCurrency.image}
                    alt={selectedCurrency.name}
                    className="w-6 h-6"
                  />
                  <span className="text-customBlue text-sm">
                    {selectedCurrency.name}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setViewModalMoney(!viewModalMoney)}
                className="text-neutral-400"
              >
                <IoIosArrowDown />
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="amount"
              className="text-customBlue mb-0.5 text-sm font-semibold"
            >
              Concepto
            </label>
            <Field
              as="input"
              type="text"
              name="description"
              placeholder="Añade descripción del pago"
              className="border placeholder:text-sm rounded border-neutral-300 p-2 w-full outline-none"
            />
            {formikProps.errors["description"] &&
              formikProps.touched["description"] && (
                <span className="span w-full" style={{ color: "red" }}>
                  <ErrorMessage name="description" />
                </span>
              )}
          </div>
          {error && (
            <p className="text-red-600 text-center mb-2 w-full">¡{error}!</p>
          )}
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
                formikProps.values.description.trim() === ""
              }
            >
              Continuar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormOperation;
