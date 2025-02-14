export const fetchCurrencies = async (url, idDevice) => {
  try {
    const response = await fetch(`${url}/currencies`, {
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": idDevice,
      },
    });
    const currencies = await response.json();
    if (response.ok) {
      return currencies;
    }
  } catch (error) {
    console.log(error);
  }
};
