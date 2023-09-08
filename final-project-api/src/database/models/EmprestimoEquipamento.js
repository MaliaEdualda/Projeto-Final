const { DataTypes } = require('sequelize');
const database = require('../database');

const EmprestimoEquipamento = database.define('EmprestimoEquipamento', {
    idEquipamento: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    data_emprestimo: DataTypes.DATEONLY,
    razao_emprestimo: DataTypes.STRING,
    previsao_devolucao: DataTypes.DATEONLY,
    data_devolucao: DataTypes.DATEONLY,
    status_emprestimo: DataTypes.STRING,
}, {
    freezeTableName: true
});

EmprestimoEquipamento.associate = function (models) {
    EmprestimoEquipamento.belongsTo(models.Usuario, { foreignKey: 'idUsuario' })
    EmprestimoEquipamento.belongsTo(models.EquipamentoDidatico, { foreignKey: 'idEquipamento' })
};

module.exports = EmprestimoEquipamento;