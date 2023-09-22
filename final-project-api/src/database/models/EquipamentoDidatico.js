const { DataTypes } = require('sequelize');
const database = require('../database');

const EquipamentoDidatico = database.define('EquipamentoDidatico', {
    nome_equipamento: DataTypes.STRING,
    marca_equipamento: DataTypes.STRING,
    tipo_equipamento: DataTypes.STRING,
    modelo_equipamento: DataTypes.STRING,
    data_aquisicao: DataTypes.DATEONLY
}, {
    freezeTableName: true
});

EquipamentoDidatico.hasMany(ReservaEquipamento, {foreignKey: "idEquipamento"});
EquipamentoDidatico.hasMany(EmprestimoEquipamento, {foreignKey: "idEquipamento"});

module.exports = EquipamentoDidatico;