// Conexão com o Banco de Dados
const { Sequelize } = require('sequelize')
const config = require('./config/config')

const DataBase = new Sequelize(config)

module.exports = DataBase