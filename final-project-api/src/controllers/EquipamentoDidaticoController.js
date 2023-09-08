const EquipamentoDidatico = require('../database/models/EquipamentoDidatico');

class EquipamentoDidaticoController {
    async buscarEquipamentoDidaticoNome() {
        const equipamentodidatico = await EquipamentoDidatico.findOne()
    }

    async buscarEquipamentoDidaticos() {
        const equipamentosdidaticos = await EquipamentoDidatico.findAll();

        return equipamentosdidaticos;
    }

    async adicionarEquipamentoDidatico(nome_equipamento, marca_equipamento, tipo_equipamento, modelo_equipamento, data_aquisicao) {
        await EquipamentoDidatico.create({
            nome_equipamento: nome_equipamento,
            marca_equipamento: marca_equipamento,
            tipo_equipamento: tipo_equipamento,
            modelo_equipamento: modelo_equipamento,
            data_aquisicao: data_aquisicao
        });
    }

    async atualizarEquipamentoDidatico(idEquipamentoDidatico, nome_equipamento, marca_equipamento, tipo_equipamento, modelo_equipamento, data_aquisicao) {
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

    async deletarEquipamentoDidatico(idEquipamentoDidatico) {
        const equipamentodidatico = await EquipamentoDidatico.findByPk(idEquipamentoDidatico);
        if (!equipamentodidatico) return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

        await EquipamentoDidatico.destroy({ where: { id: idEquipamentoDidatico } })
    }
}

module.exports = new EquipamentoDidatico();