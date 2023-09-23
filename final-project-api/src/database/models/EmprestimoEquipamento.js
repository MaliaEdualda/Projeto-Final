const { DataTypes } = require('sequelize');
const database = require('../database');

const EmprestimoEquipamento = database.define('EmprestimoEquipamento', {
    equipamentoDidaticoId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    data_emprestimo: DataTypes.DATEONLY,
    razao_emprestimo: DataTypes.STRING,
    previsao_devolucao: DataTypes.DATEONLY,
    data_devolucao: DataTypes.DATEONLY,
    status_emprestimo: DataTypes.STRING,
}, {
    freezeTableName: true
});

module.exports = EmprestimoEquipamento;