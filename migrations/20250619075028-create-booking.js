'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defeultValue:Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        onDelete:'CASCADE',
        references:{
          model:'Users',
          key:'id'
        }
      },
      providerId: {
        type: Sequelize.UUID
      },
      serviceId: {
        type: Sequelize.UUID
      },
      date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};