const { DataTypes } = require('sequelize');
const database = require('../database');

const Usuario = database.define('Usuario', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    nome_equipamento: DataTypes.STRING,
    marca_equipamento: DataTypes.STRING,
    tipo_equipamento: DataTypes.STRING,
    modelo_equipamento: DataTypes.STRING,
    data_aquisicao: DataTypes.DATEONLY
}, {
    freezeTableName: true
});

module.exports = Usuario;