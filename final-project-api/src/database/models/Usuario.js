const { DataTypes } = require('sequelize');
const database = require('../database');

const Usuario = database.define('Usuario', {
    nome_completo: DataTypes.STRING,
    email: DataTypes.STRING,
    data_nascimento: DataTypes.DATEONLY,
    cep: DataTypes.STRING,
    telefone: DataTypes.STRING,
    senha: DataTypes.STRING
}, {
    freezeTableName: true
});

Usuario.associate = function (models) {
    Usuario.belongsToMany(models.EquipamentoDidatico, { through: 'EmprestimoEquipamento', foreignKey: 'idUsuario', as: 'usuario' })
    Usuario.belongsToMany(models.EquipamentoDidatico, { through: 'ReservaEquipamento', foreignKey: 'idUsuario', as: 'usuario' })
};

module.exports = Usuario;