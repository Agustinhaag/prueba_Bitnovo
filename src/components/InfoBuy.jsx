import { fetchCurrencies } from "@/helpers/fetchCurrencies";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";

const InfoBuy = ({ orderDetails, splitSymbol }) => {
  const url = process.env.NEXT_PUBLIC_URL;
  const idDevice = process.env.NEXT_PUBLIC_ID_DEVICE;
  const [currencie, setCurrencies] = useState();

  useEffect(() => {
    fetchCurrencies(url, idDevice).then((res) => {
      res.find((item) => {
        return setCurrencies(
          item.name === orderDetails && orderDetails.currency_id
        );
      });
    });
  }, []);
  return (
    <>
      {orderDetails && (
        <div className="rounded-xl bg-neutral-100 p-3 text-customBlue flex flex-col gap-4">
          <div className="border-b border-neutral-300 pb-4 flex justify-between">
            <span>Importe:</span>
            <span>{orderDetails.fiat_amount}</span>
          </div>
          <div className="border-b border-neutral-300 pb-4 flex justify-between">
            <span>Moneda seleccionada:</span>
            <div className="flex items-center gap-1.5">
              {currencie && (
                <Image
                  alt={currencie.name}
                  src={currencie.image}
                  height={20}
                  width={20}
                />
              )}

              <span>{splitSymbol(orderDetails.currency_id)}</span>
            </div>
          </div>
          <div className="border-b border-neutral-300 pb-4 flex flex-col gap-5">
            <div className="flex justify-between">
              <span>Comercio:</span>
              <div className="flex gap-1 items-center">
                <span className="text-[#15BBE0]">
                  <BsFillPatchCheckFill />
                </span>
                <span>Comercio de prueba</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Fecha:</span>
              <div className="flex gap-1.5">
                <span>{dayjs(orderDetails.created_at).format("DD/MM/YY")}</span>
                <span>{dayjs(orderDetails.created_at).format("HH:mm")}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Concepto:</span>
            <span>{orderDetails.notes}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoBuy;
