export const reportQuery = async (req, res, next) => {
  const parametros = req.query
  const url = req.url
  console.log(`
  Hoy ${new Date()}
  Se ha recibido una consulta en la ruta ${url} 
  con los query params:
  `, parametros)
  next() // informa el codigo y continua al siguiente bloque
}