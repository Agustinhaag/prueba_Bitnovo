import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import InfoBuy from "@/components/InfoBuy";
import Buy from "@/components/Buy";
import { fetchOrders } from "@/helpers/fetchOrders";

const Transaction = () => {
  const searchParams = useSearchParams();
  const identifier = searchParams.get("id");
  const [orderDetails, setOrderDetails] = useState(null);
  const url = process.env.NEXT_PUBLIC_URL;
  const idDevice = process.env.NEXT_PUBLIC_ID_DEVICE;
  console.log(orderDetails);
  useEffect(() => {
    if (identifier) {
      fetchOrders(url, idDevice, identifier).then((res) => {
        setOrderDetails(res);
      });
    }
  }, [identifier]);
  return (
    <section className="flex gap-5 w-full justify-center h-screen mt-20">
      <div className="flex flex-col w-2/5">
        <h2 className="text-left text-customBlue font-medium mb-2">
          Resumen del pedido
        </h2>
        <InfoBuy orderDetails={orderDetails} />
      </div>
      <div className="flex flex-col w-2/5">
        <h2 className="text-left text-customBlue font-medium mb-2">
          Realiza el pago
        </h2>
        <Buy orderDetails={orderDetails} />
      </div>
    </section>
  );
};

export default Transaction;
