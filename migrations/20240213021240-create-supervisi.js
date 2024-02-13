"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Supervisis", {
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
    await queryInterface.dropTable("Supervisis");
  },
};
