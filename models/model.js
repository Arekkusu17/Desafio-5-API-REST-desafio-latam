import format from 'pg-format';

import { pool } from "../database/connection.js"

// Return all jewels following HATEOAS and can receive query params.
const getJewels = async ({ limits, order_by, page }) => {
  let query = "SELECT * FROM inventario";
  const values = [];

  if (order_by) {
    const [order_field, direction] = order_by.split("_");
    values.push(order_field, direction);
    query += " ORDER BY %s %s";
  }

  if (limits) {
    values.push(limits);
    query += " LIMIT %s";
  }

  if (page > 0 && limits) {
    const offset = (page - 1) * limits;
    values.push(offset);
    query += " OFFSET %s";
  } else {
    throw { code: "400" }
  }

  try {
    const formattedQuery = format(query, ...values);
    const { rows: inventario } = await pool.query(formattedQuery);
    return inventario;
  } catch (error) {
    console.log(error);
    throw { code: error.code }
  }

}

const getJewelsWithFilters = async ({ precio_min, precio_max, categoria, metal }) => {
  let filters = [];
  const values = [];

  const addFilter = (field, comparatorOperator, value) => {
    values.push(value);
    // to prevent SQL Injection de values for the filter will come from values array
    filters.push(`${field} ${comparatorOperator} $${values.length}`);
  };

  if (precio_max) addFilter('precio', '<=', precio_max);

  if (precio_min) addFilter('precio', '>=', precio_min);

  if (categoria) addFilter('categoria', '=', categoria);

  if (metal) addFilter('metal', '=', metal);

  let query = "SELECT * FROM inventario";

  if (filters.length > 0) {
    query += ` WHERE ${filters.join(" AND ")}`;
  }

  try {
    const { rows: jewels } = await pool.query(query, values);
    return jewels;
  } catch (error) {
    console.log(error);
    throw { code: error.code };
  }
};



const prepareHATEOAS = (jewels) => {
  try {
    const results = jewels.map((e) => {
      return {
        name: e.nombre,
        "href": `/joyas/joya/${e.id}`
      }
    })

    const totalJewels = jewels.length;
    const totalStock = jewels.reduce((sum, e) => sum + e.stock, 0)
    const HATEOAS = {
      "totalJoyas": totalJewels,
      "stockTotal": totalStock,
      results
    }

    return HATEOAS

  } catch (error) {
    console.log(error)
    throw { code: error.code }
  }
};


export const myModel = {
  getJewels,
  getJewelsWithFilters,
  prepareHATEOAS
}