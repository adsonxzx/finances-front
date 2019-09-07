export default (numberMonth) => {
  const month = {
    0: 'janeiro',
    1: 'fevereiro',
    2: 'marco',
    3: 'abril',
    4: 'maio',
    5: 'junho',
    6: 'julho',
    7: 'agosto',
    8: 'setembro',
    9: 'outubro',
    10: 'novembro',
    11: 'dezembro' 
  }
  
  return month[numberMonth]
}