const { DataTypes } = require('sequelize');
const database = require('../database');

const ReservaEquipamento = database.define('ReservaEquipamento', {
    idEquipamento: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    data_reserva: DataTypes.DATEONLY,
    razao_reserva: DataTypes.STRING,
    previsao_devolucao: DataTypes.DATEONLY,
    data_devolucao: DataTypes.DATEONLY,
    status_reserva: DataTypes.STRING,
}, {
    freezeTableName: true
});

ReservaEquipamento.belongsTo(Usuario, { foreignKey: 'idUsuario' });
ReservaEquipamento.belongsTo(EquipamentoDidatico, { foreignKey: 'idEquipamento' });

module.exports = ReservaEquipamento;