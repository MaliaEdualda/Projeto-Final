const EquipamentoDidatico = require('../database/models/EquipamentoDidatico');
const ReservaEquipamento = require('../database/models/ReservaEquipamento')
const sequelize = require('sequelize');
const { Op } = require('sequelize');

class EquipamentoDidaticoController {
    async contarEquipamentos() {
        const quantidade = await EquipamentoDidatico.count({
            where: {
                situacao_estoque: { [Op.ne]: "INATIVO" }
            }
        });

        return quantidade;
    }

    async contarEquipamentosByMarca() {
        const [result, metadata] = await EquipamentoDidatico.sequelize.query(
            'SELECT COUNT(e.id) AS "quantidade",' +
            ' e.marca_equipamento AS "marca"' +
            ' FROM public."EquipamentoDidatico" e' +
            " WHERE e.situacao_estoque = 'ATIVO'" +
            ' GROUP BY e.marca_equipamento' +
            ' ORDER BY "quantidade" DESC' +
            ' LIMIT 5');

        return result;
    }

    async buscarEquipamentoID(idEquipamento) {
        const equipamentodidatico = await EquipamentoDidatico.findByPk(idEquipamento);

        return equipamentodidatico;
    }

    async buscarEquipamentos() {
        const equipamentosdidaticos = await EquipamentoDidatico.findAll({
            where: { situacao_estoque: { [Op.ne]: "INATIVO" } },
            order: [["id", "ASC"]]
        });

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

        query.situacao_estoque = { [Op.like]: "ATIVO"}

        const equipamentos = await EquipamentoDidatico.findAll({
            where: query
        });

        return equipamentos
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

    async deletarEquipamento(idEquipamento) {
        const equipamento = await EquipamentoDidatico.findByPk(idEquipamento);
        if (!equipamento) return "Equipamento não encontrado."
        
        const isReservado = await ReservaEquipamento.findAll({
            where: {
                equipamentoDidaticoId: idEquipamento,
                status_reserva: { [Op.ne]: "Concluída" }
            }
        })

        if (isReservado.length > 0) return "Você não pode excluir equipamentos com reservas em andamento.";

        await EquipamentoDidatico.update(
            {
                situacao_estoque: "INATIVO"
            },
            {
                where: { id: idEquipamento }
            });
    }
}

module.exports = new EquipamentoDidaticoController();