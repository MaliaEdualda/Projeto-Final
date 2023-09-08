const EquipamentoDidatico = require('../database/models/EquipamentoDidatico');
const EmprestimoEquipamento = require('../database/models/EmprestimoEquipamento');
const Usuario = require('../database/models/Usuario');

class EmprestimoEquipamentoController {
    async buscarEmprestimos() {
        const emprestimos = await EmprestimoEquipamento.findAll();

        return emprestimos;
    }

    async adicionarEmprestimo(idEquipamento, idUsuario, data_emprestimo, razao_emprestimo, previsao_devolucao, data_devolucao, status_emprestimo) {
        const equipamento = await EquipamentoDidatico.findByPk(idEquipamento);
        if (!equipamento) return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

        const usuario = await Usuario.findByPk(idUsuario);
        if (!usuario) return "Este ID não corresponde a nenhum usuário. Verifique o ID.";
        
        await EmprestimoEquipamento.create({
            idEquipamento: idEquipamento,
            idUsuario: idUsuario,
            data_emprestimo: data_emprestimo,
            razao_emprestimo: razao_emprestimo,
            previsao_devolucao: previsao_devolucao,
            data_devolucao: data_devolucao,
            status_emprestimo: status_emprestimo
        });
    }

    async atualizarEmprestimo(idEmprestimo, idEquipamento, idUsuario, data_emprestimo, razao_emprestimo, previsao_devolucao, data_devolucao, status_emprestimo) {
        const emprestimo = await EmprestimoEquipamento.findByPk(idEmprestimo);
        if(!emprestimo) return "Este ID não corresponde a nenhum empréstimo. Verifique o ID."
        
        if (!idEquipamento) idEquipamento = emprestimo.idEquipamento;
        const equipamento = await EquipamentoDidatico.findByPk(idEquipamento);
        if (!equipamento) return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

        if (!idUsuario) idUsuario = emprestimo.idUsuario;
        const usuario = await Usuario.findByPk(idUsuario);
        if (!usuario) return "Este ID não corresponde a nenhum usuário. Verifique o ID.";

        if (!data_emprestimo) data_emprestimo = emprestimo.data_emprestimo;
        if (!razao_emprestimo) razao_emprestimo = emprestimo.razao_reserva;
        if (!previsao_devolucao) previsao_devolucao = emprestimo.previsao_devolucao;
        if (!data_devolucao) data_devolucao = emprestimo.data_devolucao;
        if (!status_emprestimo) status_emprestimo = emprestimo.status_reserva;

        await EmprestimoEquipamento.update({
            idEquipamento: idEquipamento,
            idUsuario: idUsuario,
            data_emprestimo: data_emprestimo,
            razao_emprestimo: razao_emprestimo,
            previsao_devolucao: previsao_devolucao,
            data_devolucao: data_devolucao,
            status_emprestimo: status_emprestimo
        },
            { where: { id: idEmprestimo } });
    }

    async deletarReserva(idEmprestimo) {
        const emprestimo = await EmprestimoEquipamento.findByPk(idEmprestimo);
        if (!emprestimo) return "Este ID não corresponde a nenhum empréstimo. Verifique o ID.";

        await EmprestimoEquipamento.destroy({ where: { id: idEmprestimo } })
    }
}

module.exports = new EmprestimoEquipamentoController();