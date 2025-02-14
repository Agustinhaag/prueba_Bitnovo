export const validateForm = (input, minAmount, maxAmount) => {
  const errors = {};

  if (!input.amount) {
    errors.amount = "El importe es requerido";
  } else if (Number(input.amount) < minAmount) {
    errors.amount = `El importe no puede ser menor a ${minAmount}`;
  } else if (Number(input.amount) > maxAmount) {
    errors.amount = `El importe no puede ser mayor a ${maxAmount}`;
  }
  if (!input.description) {
    errors.description = "La descripción es requerida";
  }

  return errors;
};
