const Helper = require("../helper.js");
const { Deliveryman, Supervisi } = require("../models/index.js");

// https://en.wikipedia.org/wiki/Haversine_formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Radius of Earth in meters
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters
  console.log(distance);
  return distance;
}

module.exports = class SupervisiController {
  static async post(req, res, next) {
    try {
      // get loggedIn (ONLY SUPERVISI CAN)
      const { id } = req.loggedInSupervisi.dataValues;
      if (!id) {
        Helper.error("Unauthorized.", 401);
      }
      // GET
      const supervisiObj = await Supervisi.findByPk(id); // .../:id
      const { NIK: loggedInSupervisiNIK } = supervisiObj;
      // get body
      const {
        username,
        password,
        gender,
        umur,
        nomorHandphone,
        status,
        longitude,
        latitude,
        NIK,
      } = req.body;
      // POST
      const obj = await Deliveryman.create({
        username,
        password,
        gender,
        umur,
        nomorHandphone,
        status,
        longitude,
        latitude,
        NIK,
        NIKSupervisi: loggedInSupervisiNIK,
        tasks: 0,
      });
      // res
      res.status(201).json({
        message: "Deliveryman successfully created.",
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
      const obj = await Deliveryman.findOne({ where: { username } });
      if (!obj) {
        Helper.error("Deliveryman not found. Please check your username.", 401);
      }
      // wrong password? throw
      if (!(await Helper.compare(password, obj.password))) {
        Helper.error("Wrong password. Please try again.", 401);
      }
      // payload (user ID) -> token
      const token = await Helper.sign(obj.id);
      // res
      res.status(200).json({
        message: "Deliveryman successfully logged in.",
        token,
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async get(req, res, next) {
    try {
      // get loggedIn (ONLY SUPERVISI CAN)
      const { id } = req.loggedInSupervisi.dataValues;
      if (!id) {
        Helper.error("Unauthorized.", 401);
      }
      // get query
      let { limit, page, sort, sortBy, search, searchBy } = req.query; // .../?limit=10&page=1&
      const options = Helper.pagination(
        limit,
        page,
        sort,
        sortBy,
        search,
        searchBy,
        [
          "id",
          "username",
          "password",
          "createdAt",
          "updatedAt",
          "gender",
          "umur",
          "nomorHandphone",
          "status",
          "longitude",
          "latitude",
          "password",
          "NIK",
          "NIKSupervisi",
          "tasks",
        ], // validSortFields (all cols)
        [
          "username",
          "password",
          "gender",
          "nomorHandphone",
          "status",
          "password",
          "NIK",
          "NIKSupervisi",
        ] // validSearchFields (strings only)
      );
      // include Supervisi data
      options.include = [{ model: Supervisi, as: "supervisor" }];
      // GET
      const total = await Deliveryman.count();
      // GET
      const obj = await Deliveryman.findAll(options);
      // res
      res.status(200).json({
        message: "Deliveryman successfully retrieved.",
        obj,
        total,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getId(req, res, next) {
    try {
      // get loggedIn (ONLY SUPERVISI CAN)
      const { id: supervisiId } = req.loggedInSupervisi.dataValues;
      if (!supervisiId) {
        Helper.error("Unauthorized.", 401);
      }
      // get params
      const { id } = req.params;
      // GET
      const obj = await Deliveryman.findByPk(id, {
        include: [{ model: Supervisi, as: "supervisor" }],
      }); // .../:id
      // res
      res.status(200).json({
        message: "Deliveryman successfully retrieved.",
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async put(req, res, next) {
    try {
      // get loggedIn (ONLY SUPERVISI CAN)
      const { id: supervisiId } = req.loggedInSupervisi.dataValues;
      if (!supervisiId) {
        Helper.error("Unauthorized.", 401);
      }
      // get params
      const { id } = req.params;
      // get body
      let {
        username,
        password,
        gender,
        umur,
        nomorHandphone,
        status,
        longitude,
        latitude,
        NIK,
        NIKSupervisi,
        tasks,
      } = req.body;
      // not nulls -> updateFields
      const updateFields = {};
      if (username) updateFields.username = username;
      if (password) updateFields.password = await Helper.hash(password);
      if (gender) updateFields.name = gender;
      if (umur) updateFields.name = umur;
      if (nomorHandphone) updateFields.nomorHandphone = nomorHandphone;
      if (status) updateFields.status = status;
      if (longitude) updateFields.longitude = longitude;
      if (latitude) updateFields.latitude = latitude;
      if (NIK) updateFields.NIK = NIK;
      if (NIKSupervisi) updateFields.NIKSupervisi = NIKSupervisi;
      if (tasks) updateFields.tasks = tasks;
      // PUT
      const [_, [obj]] = await Deliveryman.update(updateFields, {
        where: { id },
        returning: true,
      });
      console.log(obj);
      // res
      res.status(200).json({
        message: "Deliveryman successfully updated.",
        obj,
      });
    } catch (error) {
      next(error);
    }
  }
  static async putArrived(req, res, next) {
    try {
      // get loggedIn (ONLY SUPERVISI CAN)
      const { id: supervisiId } = req.loggedInSupervisi.dataValues;
      if (!supervisiId) {
        Helper.error("Unauthorized.", 401);
      }
      // get params
      const { id } = req.params;
      // get body
      let { longitude: destinationLongitude, latitude: destinationLatitude } =
        req.body; // destination
      // not nulls -> updateFields
      // GET
      const foundDeliveryman = await Deliveryman.findByPk(id, {
        include: [{ model: Supervisi, as: "supervisor" }],
      }); // .../:id
      let { longitude, latitude } = foundDeliveryman; // current positoin
      // diff?
      const distanceInMeters = calculateDistance(
        latitude,
        longitude,
        destinationLatitude,
        destinationLongitude
      );
      // in 5m? PUT
      if (distanceInMeters <= 5) {
        // PUT
        const [_, [obj]] = await Deliveryman.update(
          { status: "Complete" },
          {
            where: { id },
            returning: true,
          }
        );
        // res
        return res.status(200).json({
          message: "Deliveryman status successfully updated to Complete.",
          obj,
        });
        // far? 400
      } else {
        return res.status(400).json({
          message: "Distance to destination exceeds 5 meters.",
        });
      }
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      // get loggedIn (ONLY SUPERVISI CAN)
      const { id: supervisiId } = req.loggedInSupervisi.dataValues;
      if (!supervisiId) {
        Helper.error("Unauthorized.", 401);
      }
      // get params
      const { id } = req.params;
      // DELETE
      await Deliveryman.destroy({ where: { id } });
      // res
      res.status(200).json({
        message: "Deliveryman successfully deleted.",
      });
    } catch (error) {
      next(error);
    }
  }
};
