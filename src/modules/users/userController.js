const helperResponse = require("../../helper/wrapper");
const userModel = require("./userModel");
const { hireInvitation } = require("../../helper/email/nodemailer");
const deleteFile = require("../../helper/uploads");
const { v4: uuid } = require("uuid");

module.exports = {
  helloUser: async (request, response) => {
    response.send("Helo user!");
  },

  hirePekerja: async function (request, response) {
    try {
      // user_id => decode token after login
      const { user_id, tujuan_pesan, pesan } = request.body;
      const setDataHire = { id: uuid(), user_id, tujuan_pesan, pesan };

      for (const propertyForm in setDataHire) {
        if (setDataHire[propertyForm] === "") {
          return helperResponse.response(
            response,
            409,
            "Lengkapi Form yang kosong...",
            null
          );
        }
      }
      const dataHire = await userModel.postHirePekerja(setDataHire);

      const optionsDataHire = {
        to: "rinosatyaputra.id@gmail.com",
        subject:
          "Clover Hire, Congratulations, you have been chosen to be part of our partner company",
        template: "index",
        data: {
          tujuan_pesan: dataHire.tujuan_pesan,
          pesan: dataHire.pesan,
        },
      };
      console.log(optionsDataHire);
      await hireInvitation(optionsDataHire);

      helperResponse.response(
        response,
        200,
        "Success Send Message to worker!",
        dataHire
      );
    } catch (error) {
      helperResponse.response(response, 400, `Bad Request : ${error}`, null);
    }
  },

  getAllUser: async (req, res) => {
    try {
      let {
        page,
        limit,
        searchSkill,
        sortByName,
        sortBySkill,
        sortByLocation,
        status,
      } = req.query;

      // let offset = page * limit - limit;
      // const totalData = await userModel.getCountUser(search);
      // const totalPage = Math.ceil(totalData / limit);

      const result = await userModel.getAllUser();

      helperResponse.response(res, 200, "Success Get All Users Data!", result);
    } catch (error) {
      helperResponse.response(res, 400, `Bad Request : ${error}`, null);
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await userModel.getUserById(id);

      if (result.length < 1) {
        return helperResponse.response(
          res,
          404,
          `User by id ${id} not found !`,
          null
        );
      }

      helperResponse.response(res, 200, "Success Get User By Id!", result);
    } catch (error) {
      helperResponse.response(res, 400, `Bad Request : ${error}`, null);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.decodeToken;
      const {
        nama,
        email,
        perusahaan,
        bidangPerusahaan,
        jobDesk,
        jobStatus,
        noHandPhone,
        skill,
        domisili,
        description,
        instagram,
        github,
        gitlab,
        linkedin,
      } = req.body;

      const user = await userModel.getUserById(id);
      if (user.length < 1) {
        return helperResponse.response(
          res,
          404,
          `User by id ${id} not found`,
          null
        );
      }

      const setData = {
        nama,
        email,
        perusahaan,
        bidangPerusahaan,
        jobDesk,
        jobStatus,
        noHandPhone,
        skill,
        image: req.file ? req.file.filename : null,
        domisili,
        description,
        instagram,
        github,
        gitlab,
        linkedin,
        updatedAt: new Date(Date()),
      };

      Object.keys(setData).forEach((property) => {
        if (!setData[property]) {
          delete setData[property];
        }
      });

      if (req.file && user[0].image) {
        deleteFile(`public/uploads/user/${user[0].image}`);
      }

      const result = await userModel.updateUser(setData, id);

      return helperResponse.response(
        res,
        200,
        `Success update profile`,
        result
      );
    } catch (error) {
      return helperResponse.response(
        res,
        400,
        `Bad request : ${error.message}`,
        null
      );
    }
  },

  updateImage: async (req, res) => {
    try {
      const { id } = req.decodeToken;

      const user = await userModel.getUserById(id);
      if (user.length < 1) {
        return helperResponse.response(
          res,
          404,
          `User by id ${id} not found`,
          null
        );
      }

      if (user[0].image) {
        deleteFile(`public/uploads/user/${user[0].image}`);
      }

      const setData = {
        image: req.file ? req.file.filename : null,
        updatedAt: new Date(Date()),
      };

      const result = await userModel.updateUser(setData, id);
      return helperResponse.response(
        res,
        200,
        "Success update image user",
        result
      );
    } catch (error) {
      return helperResponse.response(
        res,
        400,
        `Bad request : ${error.message}`,
        null
      );
    }
  },
};
