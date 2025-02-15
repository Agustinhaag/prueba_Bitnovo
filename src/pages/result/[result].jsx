import { useRouter } from "next/router";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { TbXboxXFilled } from "react-icons/tb";

const result = () => {
  const router = useRouter();
  const { result } = router.query;
  console.log(result);
  return (
    <>
      {result && (
        <section className="flex justify-center items-center w-full h-screen">
          <div
            className="rounded-lg text-center flex flex-col items-center py-5 text-customBlue w-2/5 gap-4"
            style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)" }}
          >
            <span
              className={`${
                result === "ok" ? "text-emerald-700" : "text-red-500"
              } text-7xl`}
            >
              {result === "ok" ? <FaCheckCircle /> : <TbXboxXFilled />}
            </span>
            <p className="font-semibold text-lg">
              ¡Pago
              {result === "ok" ? " completado" : " cancelado"}!
            </p>
            <span className="px-1 mb-5 font-extralight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              ipsa eius excepturi vitae, quas repellat temporibus vero quaerat,
              dignissimos eaque
            </span>
            
              <button className="bg-[#035AC5] rounded-md py-3 text-white w-11/12">Crear nuevo pago</button>
            
          </div>
        </section>
      )}
    </>
  );
};

export default result;
