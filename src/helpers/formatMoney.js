export default (value) => {
  const money = parseInt(value)
  const result = money.toLocaleString(
    'pt-BR',
    {
    style:"currency", 
    currency:"BRL",
    minimumFractionDigits: 2
  })
  return result
}