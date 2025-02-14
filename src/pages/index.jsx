import { useState } from "react";
import ModalMoney from "@/components/ModalMoney";
import FormOperation from "@/components/FormOperation";

export const Home = () => {
  const [viewModalMoney, setViewModalMoney] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  return (
    <section className="flex items-center h-screen">
      <div
        className="w-1/2 mx-auto  rounded-lg p-3"
        style={{ boxShadow: "0 0 16px rgba(0, 0, 0, 0.2)" }}
      >
        <h1 className="text-center text-customBlue font-semibold text-2xl my-2">Crear pago</h1>
        <div className="w-full">
          <FormOperation
            selectedCurrency={selectedCurrency}
            setViewModalMoney={setViewModalMoney}
            viewModalMoney={viewModalMoney}
          />
        </div>
      </div>
      <ModalMoney
        setViewModalMoney={setViewModalMoney}
        viewModalMoney={viewModalMoney}
        setSelectedCurrency={setSelectedCurrency}
        selectedCurrency={selectedCurrency}
      />
    </section>
  );
};

export default Home;
