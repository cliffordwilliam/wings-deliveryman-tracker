"use strict";
const { Model } = require("sequelize");
const Helper = require("../helper");
module.exports = (sequelize, DataTypes) => {
  class Deliveryman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Supervisi, {
        foreignKey: "NIKSupervisi", // mine
        targetKey: "NIK", // target
        as: "supervisor", // col name
      });
    }
  }
  Deliveryman.init(
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

      umur: {
        type: DataTypes.STRING,
        allowNull: false, // required
        validate: {
          min: { args: [18], msg: "Umur value must be a minimum of 100." }, // min number 100

          notNull: { msg: "Umur is required." }, // required
          notEmpty: { msg: "Umur cannot be empty." }, // required
        },
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: false, // required
        validate: {
          len: {
            args: [4, Infinity],
            msg: "Gender must have a minimum length of 4 characters.",
          }, // char len min 5
          notNull: { msg: "Gender is required." }, // required
          notEmpty: { msg: "Gender cannot be empty." }, // required
        },
      },

      nomorHandphone: {
        type: DataTypes.STRING,
        allowNull: false, // required
        validate: {
          len: {
            args: [5, Infinity],
            msg: "nomorHandphone must have a minimum length of 5 characters.",
          }, // char len min 5
          notNull: { msg: "nomorHandphone is required." }, // required
          notEmpty: { msg: "nomorHandphone cannot be empty." }, // required
        },
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false, // required
        validate: {
          len: {
            args: [5, Infinity],
            msg: "status must have a minimum length of 5 characters.",
          }, // char len min 5
          notNull: { msg: "status is required." }, // required
          notEmpty: { msg: "status cannot be empty." }, // required
        },
      },

      longitude: {
        type: DataTypes.DECIMAL,
        allowNull: false, // required
        validate: {
          notNull: { msg: "status is required." }, // required
          notEmpty: { msg: "status cannot be empty." }, // required
        },
      },

      latitude: {
        type: DataTypes.DECIMAL,
        allowNull: false, // required
        validate: {
          notNull: { msg: "status is required." }, // required
          notEmpty: { msg: "status cannot be empty." }, // required
        },
      },

      NIK: {
        type: DataTypes.STRING,
        allowNull: false, // required
        unique: { msg: "NIK is already in use." }, // unique
        validate: {
          len: {
            args: [5, Infinity],
            msg: "NIK must have a minimum length of 5 characters.",
          }, // char len min 5
          notNull: { msg: "NIK is required." }, // required
          notEmpty: { msg: "NIK cannot be empty." }, // required
        },
      },

      NIKSupervisi: {
        type: DataTypes.STRING,
        allowNull: false, // required
        unique: { msg: "NIKSupervisi is already in use." }, // unique
        validate: {
          len: {
            args: [5, Infinity],
            msg: "NIKSupervisi must have a minimum length of 5 characters.",
          }, // char len min 5
          notNull: { msg: "NIKSupervisi is required." }, // required
          notEmpty: { msg: "NIKSupervisi cannot be empty." }, // required
        },
      },

      tasks: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // default value
        validate: {
          min: { args: [0], msg: "Tasks value must be a minimum of 0." }, // min number 100
        },
      },
    },
    {
      sequelize,
      modelName: "Deliveryman",
    }
  );
  Deliveryman.beforeCreate(async (deliveryman) => {
    deliveryman.password = await Helper.hash(deliveryman.password);
  });
  return Deliveryman;
};
