const EquipamentoDidatico = require('../database/models/EquipamentoDidatico');
const EmprestimoEquipamento = require('../database/models/EmprestimoEquipamento');
const Usuario = require('../database/models/Usuario');

class EmprestimoEquipamentoController {
    async buscarEmprestimos() {
        const emprestimos = await EmprestimoEquipamento.findAll({ order: [["id", "ASC"]]});

        return emprestimos;
    }

    async adicionarEmprestimo(attributes) {
        const equipamento = await EquipamentoDidatico.findByPk(attributes.equipamentoDidaticoId);
        if (!equipamento) return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

        const usuario = await Usuario.findByPk(attributes.usuarioId);
        if (!usuario) return "Este ID não corresponde a nenhum usuário. Verifique o ID.";

        await EmprestimoEquipamento.create(attributes);
    }

    async atualizarEmprestimo(idEmprestimo, attributes) {
        const emprestimo = await EmprestimoEquipamento.findByPk(idEmprestimo);
        if (!emprestimo) return "Este ID não corresponde a nenhum empréstimo. Verifique o ID."

        if (!attributes.equipamentoDidaticoId) attributes.equipamentoDidaticoId = emprestimo.equipamentoDidaticoId;
        const equipamento = await EquipamentoDidatico.findByPk(attributes.equipamentoDidaticoId);
        if (!equipamento) return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

        if (!attributes.usuarioId) attributes.usuarioId = emprestimo.usuarioId;
        const usuario = await Usuario.findByPk(attributes.usuarioId);
        if (!usuario) return "Este ID não corresponde a nenhum usuário. Verifique o ID.";

        if (!attributes.data_emprestimo) attributes.data_emprestimo = emprestimo.data_emprestimo;
        if (!attributes.razao_emprestimo) attributes.razao_emprestimo = emprestimo.razao_reserva;
        if (!attributes.previsao_devolucao) attributes.previsao_devolucao = emprestimo.previsao_devolucao;
        if (!attributes.data_devolucao) attributes.data_devolucao = emprestimo.data_devolucao;
        if (!attributes.status_emprestimo) attributes.status_emprestimo = emprestimo.status_reserva;

        await EmprestimoEquipamento.update(attributes, { where: { id: idEmprestimo } });
    }

    async deletarEmprestimo(idEmprestimo) {
        const emprestimodeletado = await EmprestimoEquipamento.destroy({ where: { id: idEmprestimo } });

        return emprestimodeletado;
    }
}

module.exports = new EmprestimoEquipamentoController();