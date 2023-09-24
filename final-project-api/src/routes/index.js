const express = require('express');
const routes = express.Router();

const UsuarioRoute = require('./UsuarioRoute');
const EquipamentoRoute = require('./EquipamentoRoute');
const ReservaRoute = require('./ReservaRoute');

routes.use('/usuario', UsuarioRoute);
routes.use('/equipamento', EquipamentoRoute);
routes.use('/reserva', ReservaRoute);

module.exports = routes