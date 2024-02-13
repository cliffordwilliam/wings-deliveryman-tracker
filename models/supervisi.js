"use strict";
const { Model } = require("sequelize");
const Helper = require("../helper");
module.exports = (sequelize, DataTypes) => {
  class Supervisi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Deliveryman, {
        foreignKey: "NIKSupervisi",
        sourceKey: "NIK",
        as: "deliverymen",
      });
    }
  }
  Supervisi.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false, // required
        unique: { msg: "Username is already in use." }, // unique
        validate: {
          len: {
            args: [5, Infinity],
            msg: "Username must have a minimum length of 5 characters.",
          }, // char len min 5
          notNull: { msg: "Username is required." }, // required
          notEmpty: { msg: "Username cannot be empty." }, // required
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false, // required
        validate: {
          len: {
            args: [5, Infinity],
            msg: "Password must have a minimum length of 5 characters.",
          }, // char len min 5
          notNull: { msg: "Password is required." }, // required
          notEmpty: { msg: "Password cannot be empty." }, // required
        },
      },

      NIK: {
        type: DataTypes.STRING,
        allowNull: false, // required
        validate: {
          len: {
            args: [5, Infinity],
            msg: "NIK must have a minimum length of 5 characters.",
          }, // char len min 5
          notNull: { msg: "NIK is required." }, // required
          notEmpty: { msg: "NIK cannot be empty." }, // required
        },
      },
    },
    {
      sequelize,
      modelName: "Supervisi",
    }
  );
  Supervisi.beforeCreate(async (supervisi) => {
    supervisi.password = await Helper.hash(supervisi.password);
  });
  return Supervisi;
};
