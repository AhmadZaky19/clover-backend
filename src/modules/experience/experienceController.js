const helperResponse = require("../../helper/wrapper");
const experienceModel = require("./experienceModel");
const { v4: uuid } = require("uuid");
module.exports = {

  postExperience: async (req, res) => {
    try {
      const { body } = req
      const setData = { id: uuid(), ...body }
      const result = await experienceModel.postExperience(setData)
      return helperResponse.response(res, 200, "Success Create Data", result)
    }
    catch (error) {
      return helperResponse.response(res, 400, `Bad Request(${error.message})`, null)
    }
  },
  getExperienceByUserId: async (req, res) => {
    try {
      const { user_id } = req.params
      const result = await experienceModel.getExperienceByUserId(user_id)
      if (result.length < 1) {
        return helperResponse.response(
          res, 404, `User Id ${user_id} Not Found!`, null)
      }
      return helperResponse.response(
        res, 200, 'Success Get By User Id', result)
    } catch (error) {
      return helperResponse.response(
        res, 400, `Bad Request (${error.message})`, null)
    }
  },
  getExperienceById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await experienceModel.getExperienceById(id)
      if (result.length < 1) {
        return helperResponse.response(
          res, 404, `Data by id ${id} not found!`, null)
      }
      return helperResponse.response(
        res, 200, 'Success get by id', result)
    } catch (error) {
      return helperResponse.response(
        res, 400, `Bad request (${error.message})`, null)
    }
  },
  updateExperience: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await experienceModel.getExperienceById(id);
      if (checkId.length < 1) {
        return helperResponse.response(
          res,
          404,
          `Data by id ${id} not found !`,
          null
        );
      }
      const { body } = req;
      const setData = {
        ...body,
        updatedAt: new Date(Date.now()),
      };

      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }

      const result = await experienceModel.updateExperience(setData, id);
      return helperResponse.response(res, 200, "Success update data", result);
    } catch (error) {
      return helperResponse.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  deleteExperience: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await experienceModel.getExperienceById(id);
      if (checkId.length < 1) {
        return helperResponse.response(
          res,
          404,
          `Data by id ${id} not found !`,
          null
        );
      }
      const result = await experienceModel.deleteExperience(id);
      return helperResponse.response(res, 200, "Success delete data", result);
    } catch (error) {
      return helperResponse.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
}