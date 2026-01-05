"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("donors", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await queryInterface.createTable("donor_addresses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      donor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "donors",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      address_line1: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      address_line2: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      postcode: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },

      is_current: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "Only one current address per donor",
      },

      valid_from: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      valid_to: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Null means current address",
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

    await queryInterface.createTable("gift_aid_declarations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      donor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "donors",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      donor_address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "donor_addresses",
          key: "id",
        },
        onDelete: "RESTRICT",
        comment: "Address at time of declaration",
      },

      declaration_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "Can be revoked by donor",
      },

      revoked_date: {
        type: Sequelize.DATE,
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

    await queryInterface.createTable("donations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      donor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "donors",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      donor_address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "donor_addresses",
          key: "id",
        },
        onDelete: "RESTRICT",
        comment: "Address at time of donation",
      },

      gift_aid_declaration_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "gift_aid_declarations",
          key: "id",
        },
        onDelete: "RESTRICT",
        comment: "Null if donor declined Gift Aid",
      },

      stripe_payment_intent_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Amount in pence",
      },

      donation_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      gift_aid_amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "Calculated Gift Aid (25% of donation)",
      },

      gift_aid_claimed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      gift_aid_claimed_date: {
        type: Sequelize.DATE,
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

    await queryInterface.addIndex("donor_addresses", ["donor_id"]);
    await queryInterface.addIndex("donor_addresses", ["donor_id", "is_current"]);
    
    await queryInterface.addIndex("gift_aid_declarations", ["donor_id"]);
    await queryInterface.addIndex("gift_aid_declarations", ["donor_id", "is_active"]);
    
    await queryInterface.addIndex("donations", ["donor_id"]);
    await queryInterface.addIndex("donations", ["stripe_payment_intent_id"]);
    await queryInterface.addIndex("donations", ["gift_aid_declaration_id"]);
    await queryInterface.addIndex("donations", ["gift_aid_claimed"]);
    await queryInterface.addIndex("donations", ["donation_date"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("donations");
    await queryInterface.dropTable("gift_aid_declarations");
    await queryInterface.dropTable("donor_addresses");
    await queryInterface.dropTable("donors");
  },
};