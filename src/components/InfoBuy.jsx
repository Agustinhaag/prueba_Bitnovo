import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";

const InfoBuy = ({ orderDetails }) => {
  return (
    <div className="rounded-xl bg-neutral-100 p-3 text-customBlue flex flex-col gap-4">
      <div className="border-b border-neutral-300 pb-4 flex justify-between">
        <span>Importe:</span>
        <span></span>
      </div>
      <div className="border-b border-neutral-300 pb-4 flex justify-between">
        <span>Moneda seleccionada:</span>
        <span></span>
      </div>
      <div className="border-b border-neutral-300 pb-4 flex flex-col gap-5">
        <div className="flex justify-between">
          <span>Comercio:</span>
          <div>
            <span className="text-[#15BBE0]">
              <BsFillPatchCheckFill />
            </span>
            <span></span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Fecha:</span>
          <span></span>
        </div>
      </div>
      <div className="flex justify-between">
        <span>Concepto:</span>
        <span></span>
      </div>
    </div>
  );
};

export default InfoBuy;
