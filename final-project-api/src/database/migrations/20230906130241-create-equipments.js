'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('EquipamentoDidatico', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome_equipamento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      marca_equipamento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_equipamento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      modelo_equipamento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_aquisicao: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EquipamentoDidatico') 
  }
};
