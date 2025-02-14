import React, { useRef, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import { fetchCurrencies } from "@/helpers/fetchCurrencies";
import CardCurrencies from "./CardCurrencies";
import { CiSearch } from "react-icons/ci";

const ModalMoney = ({
  viewModalMoney,
  setViewModalMoney,
  setSelectedCurrency,
  selectedCurrency,
}) => {
  const url = process.env.NEXT_PUBLIC_URL;
  const idDevice = process.env.NEXT_PUBLIC_ID_DEVICE;
  const [currencies, setCurrencies] = useState([]);
  const [search, setSearch] = useState("");
  const nodeRef = useRef(null);

  useEffect(() => {
    fetchCurrencies(url, idDevice).then((res) => {
      setCurrencies(res);
      // Si no hay moneda seleccionada, asigna la primera
      if (res.length > 0 && !selectedCurrency) {
        setSelectedCurrency(res[0]);
      }
    });
  }, []);

  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency);
    setViewModalMoney(false);
  };

  const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().startsWith(search.toLowerCase())
  );
  return (
    <CSSTransition
      in={viewModalMoney}
      timeout={900}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="modal-overlay z-50 ">
        <div
          className="modal-content min-h-[480px]"
          style={{
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
            maxHeight: "85vh",
          }}
        >
          <div className="flex items-center mb-2 pb-5 border-b w-full">
            <h3 className="font-semibold text-xl text-customBlue">
              Seleccionar criptomoneda
            </h3>
          </div>
          <button
            onClick={() => setViewModalMoney(false)}
            type="button"
            className="absolute top-5 right-5 py-1 px-1.5 transition-all  bg-transparent rounded-md font-light text-lg hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
          <div>
            <div className="flex gap-1 items-center mb-2 border rounded-md border-neutral-200 p-1.5">
              <p>
                <CiSearch />
              </p>
              <input
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none w-full"
              />
            </div>
            {filteredCurrencies.length > 0 ? (
              <div className="flex flex-col gap-2">
                {filteredCurrencies.map((currencie, index) => {
                  return (
                    <CardCurrencies
                      currencie={currencie}
                      key={index}
                      handleSelectCurrency={handleSelectCurrency}
                      selectedCurrency={selectedCurrency}
                    />
                  );
                })}
              </div>
            ) : (
              <p>No hay items disponibles</p>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ModalMoney;
