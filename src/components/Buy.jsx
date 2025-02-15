import React, { useEffect, useState } from "react";
import ReactQR from "react-qr-code";
import { MdOutlineContentCopy, MdOutlineTimer } from "react-icons/md";
import { TbInfoHexagon } from "react-icons/tb";
import { useRouter } from "next/navigation";

const Buy = ({ orderDetails, splitSymbol }) => {
  const [activeButton, setActiveButton] = useState("qr");
  const [timeLeft, setTimeLeft] = useState(6 * 60);
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState(
    orderDetails?.status || "pending"
  );

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  useEffect(() => {
    if (orderDetails?.status === "EX" || orderDetails?.status === "OC") {
      router.push("/error");
    }


    // const socket = new WebSocket(
    //   `wss://payments.pre-bnvo.com/ws/${orderDetails.identifier}`
    // );

    // socket.onopen = () => {
    //   console.log("Conexión WebSocket establecida.");
    // };

    // socket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   console.log("Mensaje recibido:", data);

    //   if (data.status) {
    //     setPaymentStatus(data.status);
    //   }
    // };

    // socket.onerror = (error) => {
    //   console.error("Error en WebSocket:", error);
    // };

    // socket.onclose = () => {
    //   console.log("Conexión WebSocket cerrada.");
    // };

    // return () => {
    //   socket.close();
    // };
  }, [orderDetails]);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const qrData = `${orderDetails && orderDetails.address}?amount=${
    orderDetails && orderDetails.crypto_amount
  }`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Texto copiado al portapapeles!");
      },
      (err) => {
        console.error("Error al copiar al portapapeles: ", err);
      }
    );
  };

  return (
    <>
      {orderDetails && (
        <div
          className="rounded-lg text-center flex flex-col items-center py-5 text-customBlue"
          style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)" }}
        >
          <div className="flex items-center gap-1">
            <span className="text-xl">
              <MdOutlineTimer />
            </span>
            <span>{formatTime(timeLeft)}</span>
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

          <div
            className="rounded-2xl border-none mb-5 p-4"
            style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)" }}
          >
            <ReactQR value={qrData} size={128} />
          </div>
          <div className="flex gap-3 text-sm items-center">
            <span>Enviar</span>
            <div className="flex gap-1.5 items-center">
              <span className="font-semibold">
                {orderDetails.crypto_amount}{" "}
                {splitSymbol(orderDetails.currency_id)}
              </span>
              <span
                className="text-sky-600"
                onClick={() => copyToClipboard(orderDetails.crypto_amount)}
              >
                <MdOutlineContentCopy />
              </span>
            </div>
          </div>
          <div className="flex gap-2 text-sm items-center my-3 ">
            <span className="break-words">{orderDetails.address}</span>
            <span
              className="text-sky-600"
              onClick={() => copyToClipboard(orderDetails.address)}
            >
              <MdOutlineContentCopy />
            </span>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <span className="text-[#EAB30866] text-lg">
              <TbInfoHexagon />
            </span>
            <span>Etiqueta de destino:</span>
            <span
              className="text-sky-600"
              onClick={() => copyToClipboard(orderDetails.address)}
            >
              <MdOutlineContentCopy />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Buy;
