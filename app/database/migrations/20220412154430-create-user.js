"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      date_birth: {
        type: Sequelize.DATE,
      },
      depart_birth: {
        type: Sequelize.STRING(40),
      },
      city_birth: {
        type: Sequelize.STRING(60),
      },
      type_doc: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      num_doc: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
      },
      tel: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER(3),
      },
      marital_status: {
        type: Sequelize.STRING(20),
      },
      edu_level: {
        type: Sequelize.STRING(20),
      },
      profession: {
        type: Sequelize.STRING(60),
      },
      occupation: {
        type: Sequelize.STRING(60),
      },
      num_per_family_ncl: {
        type: Sequelize.INTEGER(3),
      },
      num_per_depen: {
        type: Sequelize.INTEGER(3),
      },
      type_housing: {
        type: Sequelize.STRING(20),
      },
      depart_resi: {
        type: Sequelize.STRING(40),
      },
      city_resi: {
        type: Sequelize.STRING(60),
      },
      home_address: {
        type: Sequelize.STRING(100),
      },
      years_resi: {
        type: Sequelize.INTEGER(3),
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      form_progress: {
        type: Sequelize.INTEGER(3),
      },
      scoring: {
        type: Sequelize.FLOAT,
      },
      type_salary: {
        type: Sequelize.STRING(11),
      },
      type_contract: {
        type: Sequelize.STRING(30),
      },
      total_assets: {
        type: Sequelize.INTEGER(4),
      },
      monthly_salary: {
        type: Sequelize.INTEGER(4),
      },
      additional_income: {
        type: Sequelize.INTEGER(4),
      },
      total_monthly_income: {
        type: Sequelize.INTEGER(4),
      },
      monthly_expenditure: {
        type: Sequelize.INTEGER(4),
      },
      have_credits: {
        type: Sequelize.STRING(3),
      },
      amount_credit_acquired: {
        type: Sequelize.INTEGER(4),
      },
      days_past_due: {
        type: Sequelize.INTEGER(1),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
