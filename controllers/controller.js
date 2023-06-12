import { myModel } from "../models/model.js";
import { handleErrors } from "../database/errors.js";

const getJewelsWithQueryParams = async (req, res) => {
  try {
    const { limits, order_by, page } = req.query
    const jewels = await myModel.getJewels({ limits, order_by, page })
    const HATEOAS = myModel.prepareHATEOAS(jewels)
    res.json(HATEOAS)
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }

};

const getJewelsWithFilters = async (req, res) => {
  try {
    const queryString = req.query;
    const jewels = await myModel.getJewelsWithFilters(queryString)
    res.json(jewels)
  } catch (error) {
    console.log(error)
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }


}


export const myController = {
  getJewelsWithQueryParams,
  getJewelsWithFilters
}


