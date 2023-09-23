const { DataTypes } = require('sequelize');
const database = require('../database');

const ReservaEquipamento = database.define('ReservaEquipamento', {
    equipamentoDidaticoId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    data_reserva: DataTypes.DATEONLY,
    razao_reserva: DataTypes.STRING,
    previsao_devolucao: DataTypes.DATEONLY,
    data_devolucao: DataTypes.DATEONLY,
    status_reserva: DataTypes.STRING,
}, {
    freezeTableName: true
});

// ReservaEquipamento.associate = (models) => {
//     
//     
// }
    
module.exports = ReservaEquipamento;