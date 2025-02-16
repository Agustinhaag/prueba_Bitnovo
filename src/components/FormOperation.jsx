import { submitOrder } from "@/helpers/fetchOrders";
import { validateForm } from "@/helpers/validateForm";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import ButtonForm from "./ButtonForm";
import FieldForm from "./FieldForm";
import Image from "next/image";

const FormOperation = ({
  selectedCurrency,
  setViewModalMoney,
  viewModalMoney,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const url = process.env.NEXT_PUBLIC_URL;
  const idDevice = process.env.NEXT_PUBLIC_ID_DEVICE;
  const router = useRouter();

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
          const response = await submitOrder(
            url,
            idDevice,
            {
              ...values,
              selectedCurrency,
            },
            setLoading,
            setError
          );
          if (response) router.push(`/transaction?id=${response.identifier}`);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {(formikProps) => (
        <Form className="flex flex-col items-start gap-5 w-full">
          <FieldForm
            formikProps={formikProps}
            label="Importe a pagar"
            name="amount"
            placeholder="Añade importe a pagar"
            type="number"
          />
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
                  <Image
                    src={selectedCurrency.image}
                    alt={selectedCurrency.name}
                    className="w-6 h-6"
                    width={24}
                    height={24}
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
          <FieldForm
            formikProps={formikProps}
            label="Concepto"
            name="description"
            placeholder="Añade descripción del pago"
            type="text"
          />
          {error && (
            <p className="text-red-600 text-center mb-2 w-full">¡{error}!</p>
          )}
          <ButtonForm formikProps={formikProps} loading={loading} />
        </Form>
      )}
    </Formik>
  );
};

export default FormOperation;
