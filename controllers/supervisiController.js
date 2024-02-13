const Helper = require("../helper.js");
const { Supervisi } = require("../models/index.js");

module.exports = class SupervisiController {
  static async post(req, res, next) {
    try {
      // get body
      const { username, password, NIK } = req.body;
      // POST
      const obj = await Supervisi.create({
        username,
        password,
        NIK,
      });
      // res
      res.status(201).json({
        message: "Supervisi successfully created.",
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      // get body
      let { username, password } = req.body;
      // null? ""
      username = username ?? "";
      password = password ?? "";
      // no user? throw
      const obj = await Supervisi.findOne({ where: { username } });
      if (!obj) {
        Helper.error("Supervisi not found. Please check your username.", 401);
      }
      // wrong password? throw
      if (!(await Helper.compare(password, obj.password))) {
        Helper.error("Wrong password. Please try again.", 401);
      }
      // payload (user ID) -> token
      const token = await Helper.sign(obj.id);
      // res
      res.status(200).json({
        message: "Supervisi successfully logged in.",
        token,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async get(req, res, next) {
    try {
      // get query
      let { limit, page, sort, sortBy, search, searchBy } = req.query; // .../?limit=10&page=1&
      const options = Helper.pagination(
        limit,
        page,
        sort,
        sortBy,
        search,
        searchBy,
        ["id", "username", "password", "createdAt", "updatedAt"], // validSortFields (all cols)
        ["username", "password"] // validSearchFields (strings only)
      );
      // GET
      const total = await Supervisi.count();
      // GET
      const obj = await Supervisi.findAll(options);
      // res
      res.status(200).json({
        message: "Supervisis successfully retrieved.",
        obj,
        total,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getId(req, res, next) {
    try {
      // get params
      const { id } = req.params;
      // GET
      const obj = await Supervisi.findByPk(id); // .../:id
      // res
      res.status(200).json({
        message: "Supervisi successfully retrieved.",
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async put(req, res, next) {
    try {
      // get loggedIn
      const { id } = req.loggedInSupervisi.dataValues;
      // get body
      let { name, password } = req.body;
      // not nulls -> updateFields
      const updateFields = {};
      if (name) updateFields.name = name;
      if (password) updateFields.password = await Helper.hash(password);
      // PUT
      const [_, [obj]] = await Supervisi.update(updateFields, {
        where: { id },
        returning: true,
      });
      // res
      res.status(200).json({
        message: "Supervisi successfully updated.",
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      // get loggedIn
      const { id } = req.loggedInUser.dataValues;
      // DELETE
      await User.destroy({ where: { id } });
      // res
      res.status(200).json({
        message: "User successfully deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
};
