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

EquipamentoDidatico.associate = function (models) {
    EquipamentoDidatico.belongsToMany(models.Usuario, { through: 'EmprestimoEquipamento', foreignKey: 'idUsuario', as: 'usuario' })
    EquipamentoDidatico.belongsToMany(models.Usuario, { through: 'ReservaEquipamento', foreignKey: 'idUsuario', as: 'usuario' })
};

module.exports = EquipamentoDidatico;