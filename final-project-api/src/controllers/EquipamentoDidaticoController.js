const EquipamentoDidatico = require('../database/models/EquipamentoDidatico');

class EquipamentoDidaticoController {
    async buscarEquipamentoID(idEquipamento) {
        const equipamentodidatico = await EquipamentoDidatico.findByPk(idEquipamento);

        return equipamentodidatico;
    }

    async buscarEquipamentoNome(nome_equipamento) {
        const equipamentodidatico = await EquipamentoDidatico.findOne({ where: { nome_equipamento: nome_equipamento } });

        return equipamentodidatico;
    }

    async buscarEquipamentos() {
        const equipamentosdidaticos = await EquipamentoDidatico.findAll();

        return equipamentosdidaticos;
    }

    async adicionarEquipamento(nome_equipamento, marca_equipamento, tipo_equipamento, modelo_equipamento, data_aquisicao) {
        await EquipamentoDidatico.create({
            nome_equipamento: nome_equipamento,
            marca_equipamento: marca_equipamento,
            tipo_equipamento: tipo_equipamento,
            modelo_equipamento: modelo_equipamento,
            data_aquisicao: data_aquisicao
        });
    }

    async atualizarEquipamento(idEquipamentoDidatico, nome_equipamento, marca_equipamento, tipo_equipamento, modelo_equipamento, data_aquisicao) {
        const equipamentodidatico = await EquipamentoDidatico.findByPk(idEquipamentoDidatico);
        if (!equipamentodidatico) return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

        if (!nome_equipamento) nome_equipamento = equipamentodidatico.nome_equipamento;
        if (!marca_equipamento) marca_equipamento = equipamentodidatico.marca_equipamento;
        if (!tipo_equipamento) tipo_equipamento = equipamentodidatico.tipo_equipamento;
        if (!modelo_equipamento) modelo_equipamento = equipamentodidatico.modelo_equipamento;
        if (!data_aquisicao) data_aquisicao = equipamentodidatico.data_aquisicao;

        await EquipamentoDidatico.update({
            nome_equipamento: nome_equipamento,
            marca_equipamento: marca_equipamento,
            tipo_equipamento: tipo_equipamento,
            modelo_equipamento: modelo_equipamento,
            data_aquisicao: data_aquisicao
        },
            { where: { id: idEquipamentoDidatico } });
    }

    async deletarEquipamento(idEquipamentoDidatico) {
        const equipamentodeletado = await EquipamentoDidatico.destroy({ where: { id: idEquipamentoDidatico } });

        return equipamentodeletado;
    }
}

module.exports = new EquipamentoDidaticoController();