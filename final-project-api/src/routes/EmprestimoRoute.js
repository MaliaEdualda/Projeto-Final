const express = require('express');
const routes = express.Router();

const emprestimoController = require('../controllers/EmprestimoEquipamentoController');

const authentication = require('../middlewares/authMiddleware');

routes.get('/', authentication, async (req, res) => {
    emprestimoController.buscarEmprestimos()
        .then((result) => {
            if (result.length === 0) return res.status(404).json({ message: "Nenhum empréstimo foi encontrado." })
            return res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Erro ao buscar os empréstimos." })
        });
});

routes.post('/', authentication, (req, res) => {
    const attributes = req.body;

    if (!attributes.equipamentoDidaticoId) return res.status(400).json({ message: "O ID do equipamento é obrigatório." });
    if (!attributes.usuarioId) return res.status(400).json({ message: "O ID do usuário é obrigatório." });
    if (!attributes.data_emprestimo) return res.status(400).json({ message: "A data do empréstimo é obrigatória." });
    if (!attributes.razao_emprestimo) return res.status(400).json({ message: "A razão do empréstimo é obrigatória." });
    if (!attributes.previsao_devolucao) return res.status(400).json({ message: "A data de previsão da devolução é obrigatória." });

    emprestimoController.adicionarEmprestimo(attributes)
        .then((result) => {
            if(result) return res.status(400).json({message: result})
            return res.status(201).json({ message: "Empréstimo criado com sucesso." });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Erro ao criar o empréstimo" });
        });
});

routes.put('/:id', authentication, (req, res) => {
    const { id } = req.params;
    const attributes = req.body;

    emprestimoController.atualizarEmprestimo(id, attributes)
        .then((result) => {
            if (result) return res.status(400).json({ message: result });
            return res.status(200).json({ message: "Empréstimo atualizado com sucesso." });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Erro ao atualizar o empréstimo." });
        });
});

routes.delete('/:id', authentication, (req, res) => {
    const { id } = req.params;
    emprestimoController.deletarEmprestimo(id)
        .then((result) => {
            if (result === 0) return res.status(404).json({ message: "Empréstimo não encontrado." });
            return res.status(200).json({ message: "Empréstimo deletado com sucesso" });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Erro ao deletar o empréstimo." })
        })
});

module.exports = routes