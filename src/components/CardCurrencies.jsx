import Image from "next/image";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

const CardCurrencies = ({
  currencie,
  handleSelectCurrency,
  selectedCurrency,
}) => {
  const splitSymbol = (symbol) => {
    const result = symbol.split("_")[0];
    return result;
  };
  return (
    <div
      className="flex justify-between hover:bg-neutral-200 rounded-md py-1.5 px-2 cursor-pointer"
      onClick={() => handleSelectCurrency(currencie)}
    >
      <div className="flex gap-2">
        <Image
          alt={currencie.name}
          src={currencie.image}
          width={50}
          height={50}
        />
        <div className="flex flex-col gap-0.5">
          <p className="text-customBlue">{currencie.name}</p>
          <p className="text-neutral-400">{splitSymbol(currencie.symbol)}</p>
        </div>
      </div>
      {selectedCurrency.symbol === currencie.symbol ? (
        <p className="text-[#357ABD]">
          <FaCheckCircle />
        </p>
      ) : (
        <button className="text-neutral-400">
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
};

export default CardCurrencies;
