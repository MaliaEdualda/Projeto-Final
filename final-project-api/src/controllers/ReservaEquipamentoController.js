const EquipamentoDidatico = require('../database/models/EquipamentoDidatico');
const ReservaEquipamento = require('../database/models/ReservaEquipamento');
const Usuario = require('../database/models/Usuario');

class ReservaEquipamentoController {
    async buscarReservas() {
        const reservas = await ReservaEquipamento.findAll();

        return reservas;
    }

    async adicionarReserva(idEquipamento, idUsuario, data_reserva, razao_reserva, previsao_devolucao, data_devolucao, status_reserva) {
        const equipamento = await EquipamentoDidatico.findByPk(idEquipamento);
        if (!equipamento) return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

        const usuario = await Usuario.findByPk(idUsuario);
        if (!usuario) return "Este ID não corresponde a nenhum usuário. Verifique o ID.";
        
        await ReservaEquipamento.create({
            idEquipamento: idEquipamento,
            idUsuario: idUsuario,
            data_reserva: data_reserva,
            razao_reserva: razao_reserva,
            previsao_devolucao: previsao_devolucao,
            data_devolucao: data_devolucao,
            status_reserva: status_reserva
        });
    }

    async atualizarReserva(idReserva, idEquipamento, idUsuario, data_reserva, razao_reserva, previsao_devolucao, data_devolucao, status_reserva) {
        const reserva = await ReservaEquipamento.findByPk(idReserva);
        if(!reserva) return "Este ID não corresponde a nenhuma reserva. Verifique o ID."
        
        if (!idEquipamento) idEquipamento = reserva.idEquipamento;
        const equipamento = await EquipamentoDidatico.findByPk(idEquipamento);
        if (!equipamento) return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

        if (!idUsuario) idUsuario = reserva.idUsuario;
        const usuario = await Usuario.findByPk(idUsuario);
        if (!usuario) return "Este ID não corresponde a nenhum usuário. Verifique o ID.";

        if (!data_reserva) data_reserva = reserva.data_reserva;
        if (!razao_reserva) razao_reserva = reserva.razao_reserva;
        if (!previsao_devolucao) previsao_devolucao = reserva.previsao_devolucao;
        if (!data_devolucao) data_devolucao = reserva.data_devolucao;
        if (!status_reserva) status_reserva = reserva.status_reserva;

        await ReservaEquipamento.update({
            idEquipamento: idEquipamento,
            idUsuario: idUsuario,
            data_reserva: data_reserva,
            razao_reserva: razao_reserva,
            previsao_devolucao: previsao_devolucao,
            data_devolucao: data_devolucao,
            status_reserva: status_reserva
        },
            { where: { id: idReserva } });
    }

    async deletarReserva(idReserva) {
        const reserva = await ReservaEquipamento.findByPk(idReserva);
        if (!reserva) return "Este ID não corresponde a nenhuma reserva. Verifique o ID.";

        await ReservaEquipamento.destroy({ where: { id: idReserva } })
    }
}

module.exports = new ReservaEquipamentoController();