const { DataTypes } = require('sequelize');
const database = require('../database');

const Usuario = database.define('Usuario', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    nome_completo: DataTypes.STRING,
    email: DataTypes.STRING,
    data_nascimento: DataTypes.DATEONLY,
    cep: DataTypes.STRING,
    telefone: DataTypes.STRING,
    senha: DataTypes.STRING
}, {
    freezeTableName: true
});

module.exports = Usuario;