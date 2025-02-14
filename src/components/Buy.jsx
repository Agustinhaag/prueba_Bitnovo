import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineContentCopy, MdOutlineTimer } from "react-icons/md";
import { TbInfoHexagon } from "react-icons/tb";

const Buy = ({ orderDetails }) => {
  const [activeButton, setActiveButton] = useState("qr"); // 'qr' o 'web3'

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <div
      className="rounded-lg text-center flex flex-col items-center py-5 text-customBlue"
      style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="flex ">
        <span>
          <MdOutlineTimer />
        </span>
        <span></span>
      </div>
      <div className="flex gap-3 my-5">
        <button
          className={`rounded-2xl py-1 px-3 text-sm transition-all duration-300 ${
            activeButton === "qr"
              ? "bg-[#035AC5] text-white"
              : "bg-neutral-200 text-neutral-500"
          }`}
          onClick={() => handleButtonClick("qr")}
        >
          Smart QR
        </button>

        <button
          className={`rounded-2xl py-1 px-3 text-sm transition-all duration-300 ${
            activeButton === "web3"
              ? "bg-[#035AC5] text-white"
              : "bg-neutral-200 text-neutral-500"
          }`}
          onClick={() => handleButtonClick("web3")}
        >
          Web3
        </button>
      </div>

      <Image
        src={""}
        height={150}
        width={150}
        alt=""
        className="rounded-2xl border-none mb-5"
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
      />

      <div className="flex gap-2 text-sm items-center">
        <span>Enviar</span>
        <span className="text-sky-600">
          <MdOutlineContentCopy />
        </span>
      </div>
      <div className="flex gap-2 text-sm items-center my-3">
        <span></span>
        <span className="text-sky-600">
          <MdOutlineContentCopy />
        </span>
      </div>
      <div className="flex gap-2 text-sm items-center">
        <span className="text-[#EAB30866] text-lg">
          <TbInfoHexagon />
        </span>
        <span>Etiqueta de destino:</span>
        <span className="text-sky-600">
          <MdOutlineContentCopy />
        </span>
      </div>
    </div>
  );
};

export default Buy;
