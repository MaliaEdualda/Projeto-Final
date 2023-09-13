const EquipamentoDidatico = require('../database/models/EquipamentoDidatico');
const { Op } = require('sequelize');

class EquipamentoDidaticoController {
    async buscarEquipamentoID(idEquipamento) {
        const equipamentodidatico = await EquipamentoDidatico.findByPk(idEquipamento);

        return equipamentodidatico;
    }

    async buscarEquipamentoNome(nome_equipamento) {
        const equipamentodidatico = await EquipamentoDidatico.findOne({ where: { nome_equipamento: { [Op.like]: nome_equipamento } } });

        return equipamentodidatico;
    }

    async buscarEquipamentos() {
        const equipamentosdidaticos = await EquipamentoDidatico.findAll({ order: [["id", "ASC"]] });

        return equipamentosdidaticos;
    }

    async buscarComFiltro(attributes) {
        let query = {};

        if (attributes.id) query.id = attributes.id

        if (attributes.nome_equipamento) query.nome_equipamento = {
            [Op.like]: `%${attributes.nome_equipamento}%`
        }

        if (attributes.marca_equipamento) query.marca_equipamento = {
            [Op.like]: `%${attributes.marca_equipamento}%`
        }

        if (attributes.tipo_equipamento) query.tipo_equipamento = {
            [Op.like]: `%${attributes.tipo_equipamento}%` 
        }

        if (attributes.modelo_equipamento) query.modelo_equipamento = {
            [Op.like]: `%${attributes.modelo_equipamento}%`
        }

        if (attributes.data_aquisicao) query.data_aquisicao = attributes.data_aquisicao

        const equipamentos = await EquipamentoDidatico.findAll({
            where: query,
        });

        return equipamentos;
    }

    async adicionarEquipamento(attributes) {
        await EquipamentoDidatico.create(attributes);
    }

    async atualizarEquipamento(idEquipamento, attributes) {
        const equipamentodidatico = await EquipamentoDidatico.findByPk(idEquipamento);
        if (!equipamentodidatico) return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

        if (!attributes.nome_equipamento) attributes.nome_equipamento = equipamentodidatico.nome_equipamento;
        if (!attributes.marca_equipamento) attributes.marca_equipamento = equipamentodidatico.marca_equipamento;
        if (!attributes.tipo_equipamento) attributes.tipo_equipamento = equipamentodidatico.tipo_equipamento;
        if (!attributes.modelo_equipamento) attributes.modelo_equipamento = equipamentodidatico.modelo_equipamento;
        if (!attributes.data_aquisicao) attributes.data_aquisicao = equipamentodidatico.data_aquisicao;

        await EquipamentoDidatico.update(attributes, { where: { id: idEquipamento } });
    }

    async deletarEquipamento(idEquipamentoDidatico) {
        const equipamentodeletado = await EquipamentoDidatico.destroy({ where: { id: idEquipamentoDidatico } });

        return equipamentodeletado;
    }
}

module.exports = new EquipamentoDidaticoController();