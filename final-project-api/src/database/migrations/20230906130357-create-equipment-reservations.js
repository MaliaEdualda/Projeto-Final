'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ReservaEquipamento', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      idEquipamento: {
        type: Sequelize.INTEGER,
        references: {
          model: 'EquipamentoDidatico',
          key: 'id'
        }
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuario',
          key: 'id'
        }
      },
      data_reserva: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      razao_reserva: {
        type: Sequelize.STRING,
        allowNull: false
      },
      previsao_devolucao: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      data_devolucao: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      status_reserva: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pendente"
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
    await queryInterface.dropTable('ReservaEquipamento') 
  }
};
