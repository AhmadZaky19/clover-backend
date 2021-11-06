const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcrypt");
const helperWrapper = require("../../helper/wrapper");
const authModel = require("./authModel");

module.exports = {
  register: async (req, res) => {
    try {
      const { nama, email, noHandphone, password, confirmPassword } = req.body;

      // PROSES PENGECEKAN EMAIL SUDAH PERNAH TERDAFTAR ATAU BLM DI DATABASE
      // PROSES ENCRYPT PASSWORD
      const hashPassword = await bcryptjs.hash(password, 10);
      const hashConfirmPassword = bcryptjs.hashSync(confirmPassword, 10);
      const setData = {
        id: uuidv4(),
        nama,
        email,
        noHandphone,
        password: hashPassword,
        confirmPassword: hashConfirmPassword,
        role: "Pekerja",
      };

      if (password === confirmPassword) {
        const result = await authModel.register(setData);

        return helperWrapper.response(res, 200, "success Registred", result);
      } else {
        return helperWrapper.response(res, 404, "pass tidak sama", null);
      }

      //   const setDataEmail = {
      //     to: email,
      //     subject: "email verification !",
      //     template: "email-verification",
      //   };
      //   await sendMail(setDataEmail);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await authModel.getUserByEmail(email);

      if (checkUser.length < 1) {
        return helperWrapper.response(res, 404, "Email not registed", null);
      }

      const passwordUser = await bcryptjs.compare(
        password,
        checkUser[0].password
      );
      // console.log(checkUser[0]);
      if (!passwordUser) {
        return helperWrapper.response(res, 400, "Wrong password", null);
      }

      // PROSES UTAMA MEMBUAT TOKEN MENGGUNAKAN JWT (DATA YANG MAU DIUBAH, KATA KUNCI, LAMA TOKEN BISA DIGUNAKAN )
      const payload = checkUser[0];
      delete payload.password;
      const token = jwt.sign({ ...payload }, "RAHASIA", {
        expiresIn: "24h",
      });
      return helperWrapper.response(res, 200, "Success login", {
        id: payload.id,
        token,
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
};
