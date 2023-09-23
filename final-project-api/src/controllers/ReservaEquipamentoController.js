const EquipamentoDidatico = require('../database/models/EquipamentoDidatico');
const ReservaEquipamento = require('../database/models/ReservaEquipamento');
const Usuario = require('../database/models/Usuario');

class ReservaEquipamentoController {
    async buscarReservas() {
        const reservas = await ReservaEquipamento.findAll({
            include: [
                {
                    model: EquipamentoDidatico,
                    required: true,
                    attributes: ['nome_equipamento']
                }, {
                    model: Usuario,
                    required: true,
                    attributes: ['nome_completo']
                }
            ]
        }, {
            order: [["id", "ASC"]]
        });

        return reservas;
    }

    async adicionarReserva(attributes) {
        const equipamento = await EquipamentoDidatico.findByPk(attributes.idEquipamento);
        if (!equipamento) return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

        const usuario = await Usuario.findByPk(attributes.idUsuario);
        if (!usuario) return "Este ID não corresponde a nenhum usuário. Verifique o ID.";

        await ReservaEquipamento.create(attributes);
    }

    async atualizarReserva(idReserva, attributes) {
        const reserva = await ReservaEquipamento.findByPk(idReserva);
        if (!reserva) return "Este ID não corresponde a nenhuma reserva. Verifique o ID."

        if (!attributes.idEquipamento) attributes.idEquipamento = reserva.idEquipamento;
        const equipamento = await EquipamentoDidatico.findByPk(attributes.idEquipamento);
        if (!equipamento) return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

        if (!attributes.idUsuario) attributes.idUsuario = reserva.idUsuario;
        const usuario = await Usuario.findByPk(attributes.idUsuario);
        if (!usuario) return "Este ID não corresponde a nenhum usuário. Verifique o ID.";

        if (!attributes.data_reserva) attributes.data_reserva = reserva.data_reserva;
        if (!attributes.razao_reserva) attributes.razao_reserva = reserva.razao_reserva;
        if (!attributes.previsao_devolucao) attributes.previsao_devolucao = reserva.previsao_devolucao;
        if (!attributes.data_devolucao) attributes.data_devolucao = reserva.data_devolucao;
        if (!attributes.status_reserva) attributes.status_reserva = reserva.status_reserva;

        await ReservaEquipamento.update(attributes, { where: { id: idReserva } });
    }

    async deletarReserva(idReserva) {
        const reservadeletada = await ReservaEquipamento.destroy({ where: { id: idReserva } });

        return reservadeletada;
    }
}

module.exports = new ReservaEquipamentoController();