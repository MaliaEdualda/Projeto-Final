const { DataTypes } = require('sequelize');
const database = require('../database');

const ReservaEquipamento = require("./ReservaEquipamento");

const EquipamentoDidatico = database.define('EquipamentoDidatico', {
    nome_equipamento: DataTypes.STRING,
    marca_equipamento: DataTypes.STRING,
    tipo_equipamento: DataTypes.STRING,
    modelo_equipamento: DataTypes.STRING,
    data_aquisicao: DataTypes.DATEONLY,
    situacao_estoque: DataTypes.STRING
}, {
    freezeTableName: true
});

EquipamentoDidatico.hasMany(ReservaEquipamento, {foreignKey: "equipamentoDidaticoId"});
ReservaEquipamento.belongsTo(EquipamentoDidatico, { foreignKey: 'equipamentoDidaticoId' });

module.exports = EquipamentoDidatico;