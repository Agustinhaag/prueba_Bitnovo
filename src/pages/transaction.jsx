import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import InfoBuy from "@/components/InfoBuy";
import Buy from "@/components/Buy";
import { fetchOrdersInfo } from "@/helpers/fetchOrders";

const Transaction = () => {
  const searchParams = useSearchParams();
  const identifier = searchParams.get("id");
  const [orderDetails, setOrderDetails] = useState(null);
  const url = process.env.NEXT_PUBLIC_URL;
  const idDevice = process.env.NEXT_PUBLIC_ID_DEVICE;

  useEffect(() => {
    if (identifier) {
      fetchOrdersInfo(url, idDevice, identifier).then((res) => {
        setOrderDetails(res);
      });
    }
  }, [identifier]);
  const splitSymbol = (symbol) => {
    const result = symbol.split("_")[0];
    return result;
  };

  return (
    <section className="flex md:flex-row flex-col md:items-start items-center gap-5 w-full justify-center h-screen mt-20">
      <div className="flex flex-col md:w-2/5 sm:w-2/3 w-4/5 md:pt-0 pt-4 min-w-72">
        <h2 className="md:text-left text-center text-customBlue font-medium mb-3">
          Resumen del pedido
        </h2>
        <InfoBuy orderDetails={orderDetails} splitSymbol={splitSymbol} />
      </div>
      <div className="flex flex-col md:w-2/5 sm:w-2/3 w-4/5 md:pb-0 pb-3 min-w-72">
        <h2 className="md:text-left text-center text-customBlue font-medium mb-3">
          Realiza el pago
        </h2>
        <Buy orderDetails={orderDetails} splitSymbol={splitSymbol} />
      </div>
    </section>
  );
};

export default Transaction;
