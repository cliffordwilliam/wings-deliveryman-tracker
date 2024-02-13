"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Deliverymans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false, // required
        unique: true, // unique
        validate: {
          validate: { len: [5, Infinity] }, // char len min 5
        },
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false, // required
        validate: {
          validate: { len: [4, Infinity] }, // char len min 4
        },
      },
      umur: {
        type: Sequelize.INTEGER,
        allowNull: false, // required
        validate: {
          min: 18, // min number 100
        },
      },
      nomorHandphone: {
        type: Sequelize.STRING,
        allowNull: false, // required
        unique: true, // unique
        validate: {
          validate: { len: [5, Infinity] }, // char len min 5
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false, // required
        validate: {
          validate: { len: [5, Infinity] }, // char len min 5
        },
      },
      longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false, // required
        validate: {},
      },
      latitude: {
        type: Sequelize.DECIMAL,
        allowNull: false, // required
        validate: {},
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, // required
        validate: {
          validate: { len: [5, Infinity] }, // char len min 5
        },
      },
      NIK: {
        type: Sequelize.STRING,
        allowNull: false, // required
        unique: true, // unique
        validate: {
          validate: { len: [5, Infinity] }, // char len min 5
        },
      },
      NIKSupervisi: {
        type: Sequelize.STRING,
        references: { model: "Supervisis", key: "NIK" }, // fk
        onUpdate: "cascade", // fk
        onDelete: "cascade", // fk
        allowNull: false, // required
        unique: true, // unique
        validate: {
          validate: { len: [5, Infinity] }, // char len min 5
        },
      },
      tasks: {
        type: Sequelize.INTEGER,
        defaultValue: 0, // default value
        validate: {
          min: 0, // min number 100
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Deliverymans");
  },
};
