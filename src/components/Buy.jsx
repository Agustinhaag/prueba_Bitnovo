"use client";

import React, { useEffect, useState } from "react";
import ReactQR from "react-qr-code";
import { MdOutlineContentCopy, MdOutlineTimer } from "react-icons/md";
import { TbInfoHexagon } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Buy = ({ orderDetails, splitSymbol }) => {
  const [activeButton, setActiveButton] = useState("qr");
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const router = useRouter();
  const urlWebSocket = process.env.NEXT_PUBLIC_URL_WEBSOCKETS;
  const [paymentStatus, setPaymentStatus] = useState(
    orderDetails?.status || "pending"
  );

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  // Cuando se monta el componente, revisa si la orden ya está vencida
  useEffect(() => {
    const isExpired = localStorage.getItem("orderExpired");
    const savedTimeLeft = localStorage.getItem("timeLeft");

    if (isExpired === "true") {
      router.push("/result/ko");
    } else if (savedTimeLeft) {
      setTimeLeft(parseInt(savedTimeLeft, 10));
    }
  }, []);

  // Websocket para status de pago
  useEffect(() => {
    if (orderDetails?.identifier && urlWebSocket) {
      const socket = new WebSocket(
        `${urlWebSocket}/${orderDetails.identifier}`
      );

      socket.onopen = () => {
        console.log("Conexión WebSocket establecida.");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.status) {
          setPaymentStatus(data.status);
        }

        if (data.status === "CO" || data.status === "AC") {
          localStorage.removeItem("orderExpired");
          localStorage.removeItem("timeLeft");
          router.push("/result/ok");
        }
      };

      socket.onerror = (error) => {
        console.error("Error en WebSocket:", error);
      };

      socket.onclose = () => {
        console.log("Conexión WebSocket cerrada.");
      };

      return () => {
        socket.close();
      };
    }
  }, [orderDetails]);

  // Contador de tiempo
  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.setItem("orderExpired", "true");
      router.push("/result/ko");
    } else {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("timeLeft", newTime.toString());
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const qrData = `${orderDetails && orderDetails.address}`;

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
            className={`rounded-2xl border-none mb-5 p-4 ${
              activeButton === "web3" ? "h-40 flex items-center" : ""
            } `}
            style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)" }}
          >
            {activeButton === "qr" ? (
              <ReactQR value={qrData} size={128} />
            ) : (
              <Image
                alt="Metamask"
                src={"/MetaMask.png"}
                width={140}
                height={120}
              />
            )}
          </div>
          <div className="flex gap-3 text-sm items-center">
            <span>Enviar</span>
            <div className="flex gap-1.5 items-center">
              <span className="font-semibold">
                {orderDetails.crypto_amount}{" "}
                {splitSymbol(orderDetails.currency_id)}
              </span>
              <button
                className="text-sky-600"
                onClick={() => copyToClipboard(orderDetails.crypto_amount)}
              >
                <MdOutlineContentCopy />
              </button>
            </div>
          </div>
          <div className="flex gap-2 text-sm items-center my-3 px-1">
            <span className="break-all">{orderDetails.address}</span>
            <button
              className="text-sky-600"
              onClick={() => copyToClipboard(orderDetails.address)}
            >
              <MdOutlineContentCopy />
            </button>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <span className="text-[#EAB30866] text-lg">
              <TbInfoHexagon />
            </span>
            <span>Etiqueta de destino: {orderDetails.tag_memo}</span>
            <button
              className="text-sky-600"
              onClick={() => copyToClipboard(orderDetails.tag_memo)}
            >
              <MdOutlineContentCopy />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Buy;
