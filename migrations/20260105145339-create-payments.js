"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("stripe_payments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      stripe_payment_intent_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      stripe_charge_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      donor_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      donor_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    await queryInterface.addIndex("stripe_payments", [
      "stripe_payment_intent_id",
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("stripe_payments");
  },
};
