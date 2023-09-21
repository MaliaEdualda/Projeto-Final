'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('EmprestimoEquipamento', {
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
      data_emprestimo: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      razao_emprestimo: {
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
      status_emprestimo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Em andamento"
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
    await queryInterface.dropTable('EmprestimoEquipamento') 
  }
};
