import format from 'pg-format';

import { pool } from "../database/connection.js"

// Return all jewels following HATEOAS and can receive query params.
const getJewels = async ({ limits, order_by, page }) => {
  const [order_field, direction] = order_by.split("_");

  const offset = (page - 1) * limits;

  const formattedQuery = format(
    'SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s',
    order_field,
    direction,
    limits,
    offset
  );

  const { rows: inventario } = await pool.query(formattedQuery);
  console.log(inventario)
  return inventario;
}

const getJewelsWithFilters = async ({ precio_min, precio_max, categoria, metal }) => {
  let filters = [];
  const values = [];

  const addFilter = (field, comparatorOperator, value) => {
    values.push(value);
    filters.push(`${field} ${comparatorOperator} ${value}`)
  }
  //llamando a funcion interna con argumentos definidos
  if (precio_max) addFilter('precio', '<=', precio_max)

  if (precio_min) addFilter('precio', '>=', precio_min)

  if (categoria) addFilter('categoria', '=', `'${categoria}'`)

  if (metal) addFilter('metal', '=', `'${metal}'`)

  let query = "SELECT * FROM inventario";

  if (filters.length > 0) {
    filters = filters.join(" AND ");
    query += ` WHERE ${filters}`;
  }

  const { rows: jewels } = await pool.query(query)
  return jewels
}



const prepareHATEOAS = (jewels) => {
  const results = jewels.map((e) => {
    return {
      name: e.nombre,
      "href": `/joyas/joya/${e.id}`
    }
  })

  console.log("Valor de Results: ", results)

  const totalJewels = jewels.length;
  const totalStock = jewels.reduce((sum, e) => sum + e.stock, 0)
  const HATEOAS = {
    "totalJoyas": totalJewels,
    "stockTotal": totalStock,
    results

  }
  return HATEOAS
};


export const myModel = {
  getJewels,
  getJewelsWithFilters,
  prepareHATEOAS
}