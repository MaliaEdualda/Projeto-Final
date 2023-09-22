const { DataTypes } = require('sequelize');
const database = require('../database');

const Usuario = database.define('Usuario', {
    nome_completo: DataTypes.STRING,
    email: DataTypes.STRING,
    data_nascimento: DataTypes.DATEONLY,
    cep: DataTypes.STRING,
    telefone: DataTypes.STRING,
    senha: DataTypes.STRING,
    situacao: DataTypes.STRING
}, {
    freezeTableName: true
});

Usuario.hasMany(ReservaEquipamento, {foreignKey: "idUsuario"});
Usuario.hasMany(EmprestimoEquipamento, {foreignKey: "idUsuario"});

module.exports = Usuario;