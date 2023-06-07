import { myModel } from "../models/model.js";
// import {getJewels} from "../"

const getJewelsWithQueryParams = async (req, res) => {
  const { limits, order_by, page } = req.query
  const jewels = await myModel.getJewels({ limits, order_by, page })
  const HATEOAS = myModel.prepareHATEOAS(jewels)
  res.json(HATEOAS)
};

const getJewelsWithFilters = async (req, res) => {
  const queryString = req.query;
  const jewels = await myModel.getJewelsWithFilters(queryString)

  res.json(jewels)

}


export const myController = {
  getJewelsWithQueryParams,
  getJewelsWithFilters
}


