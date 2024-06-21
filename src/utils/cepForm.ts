export const formatCEP = (value: string) => {
  const cep = value.replace(/\D/g, '');
  if (cep.length > 5) {
    console.log(`${cep.slice(0, 5)}-${cep.slice(5, 8)}`, cep)
    return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
  }
  return cep;
};