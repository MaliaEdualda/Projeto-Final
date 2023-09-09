const express = require('express');
const routes = express.Router();

const equipamentoController = require('../controllers/EquipamentoDidaticoController');

const authentication = require('../middlewares/authMiddleware');

routes.get('/', authentication, async (req, res) => {
    equipamentoController.buscarEquipamentoDidaticos()
        .then((result) => {
            if (result.length === 0) return res.status(404).json({ message: "Nenhum equipamento didático foi encontrado." })
            return res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Erro ao buscar os equipamentos." })
        });
});

routes.get('/:id', authentication, async (req, res) => {
    const { id } = req.params;
    equipamentoController.buscarEquipamentoID(id)
        .then((result) => {
            if (result) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ message: "Este ID não corresponde a nenhum equipamento. Verifique o ID." });
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Erro ao encontrar o equipamento." })
        })
});

routes.get('/:nome', authentication, async (req, res) => {
    const { nome } = req.params;
    equipamentoController.buscarEquipamentoNome(nome)
        .then((result) => {
            if (result) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ message: "Equipamento não encontrado. Verifique o nome." })
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Erro ao encontrar o equipamento." })
        });
});

routes.post('/', authentication, (req, res) => {
    const { nome_equipamento, marca_equipamento, tipo_equipamento, modelo_equipamento, data_aquisicao } = req.body;

    if (!nome_equipamento) return res.status(400).json({ message: "O nome do equipamento é obrigatório." });
    if (!marca_equipamento) return res.status(400).json({ message: "A marca do equipamento é obrigatória." });
    if (!tipo_equipamento) return res.status(400).json({ message: "O tipo de equipamento é obrigatório." });
    if (!modelo_equipamento) return res.status(400).json({ message: "O modelo do equipamento é obrigatório." });
    if (!data_aquisicao) return res.status(400).json({ message: "A data de aquisição é obrigatória." });

    equipamentoController.adicionarEquipamento(nome_equipamento, marca_equipamento, tipo_equipamento, modelo_equipamento, data_aquisicao)
        .then((result) => {
            return res.status(201).json({ message: "Equipamento criado com sucesso." });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Erro ao criar o equipamento" });
        });
});

routes.put('/:id', authentication, (req, res) => {
    const { id } = req.params;
    const { nome_equipamento, marca_equipamento, tipo_equipamento, modelo_equipamento, data_aquisicao } = req.body;

    equipamentoController.atualizarEquipamento(id, nome_equipamento, marca_equipamento, tipo_equipamento, modelo_equipamento, data_aquisicao)
        .then((result) => {
            if (result) return res.status(400).json({ message: result });
            return res.status(200).json({ message: "Entregador atualizado com sucesso." });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Erro ao atualizar o equipamento." });
        });
});

routes.delete('/:id', authentication, (req, res) => {
    const { id } = req.params;

    equipamentoController.deletarEquipamento(id)
        .then((result) => {
            if (result.length === 0) return res.status(404).json({ message: "Equipamento não encontrado." });
            return res.status(200).json({ message: "Equipamento deletado com sucesso. " })
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Erro ao deletar o equipamento." })
        });
});

module.exports = { routes }