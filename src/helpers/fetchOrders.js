import Swal from "sweetalert2";

export const submitOrder = async (url, idDevice, values, setLoading) => {
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("expected_output_amount", Number(values.amount));
    formData.append("input_currency", values.selectedCurrency.symbol);
    formData.append("notes", values.description);

    const response = await fetch(`${url}/orders/`, {
      method: "POST",
      headers: {
        "X-Device-Id": idDevice,
      },
      body: formData,
    });
    if (!response.ok) {
      setLoading(false);
      throw new Error(`Error: ${response.status} - ${await response.text()}`);
    }
    Swal.fire({
      title: "Orden creada correctamente",
      text: "Sera redirijido al resumen de su orden.",
      icon: "success",
    });
    const data = await response.json();
    setLoading(false);
    return data;
  } catch (error) {
    setLoading(false)
    console.log(error);
  }
};

export const fetchOrders = async (url, idDevice, identifier) => {
  try {
    const response = await fetch(`${url}/orders/`, {
      headers: {
        "X-Device-Id": idDevice,
      },
    });
    if (response.ok) {
      const data = await response.json();
      const dataOrder = data.find((order) => {
        return order.identifier === identifier;
      });
      return dataOrder;
    }
  } catch (error) {
    console.error("Error obteniendo detalles de la orden:", error);
  }
};
