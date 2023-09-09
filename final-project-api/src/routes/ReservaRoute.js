const express = require('express');
const routes = express.Router();

const reservaController = require('../controllers/ReservaEquipamentoController');

const authentication = require('../middlewares/authMiddleware');

routes.get('/', authentication, async (req, res) => {
    reservaController.buscarReservas()
        .then((result) => {
            if (result.length === 0) return res.status(404).json({ message: "Nenhuma reserva foi encontrada." })
            return res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Erro ao buscar as reservas." })
        });
});

routes.post('/', authentication, (req, res) => {
    const attributes = req.body;

    if (!attributes.idEquipamento) return res.status(400).json({ message: "O ID do equipamento é obrigatório." });
    if (!attributes.idUsuario) return res.status(400).json({ message: "O ID do usuário é obrigatório." });
    if (!attributes.data_reserva) return res.status(400).json({ message: "A data da reserva é obrigatória." });
    if (!attributes.razao_reserva) return res.status(400).json({ message: "A razão da reserva é obrigatória." });
    if (!attributes.previsao_devolucao) return res.status(400).json({ message: "A data de previsão da devolução é obrigatória." });
    if (!attributes.status_reserva) return res.status(400).json({ message: "O status da reserva é obrigatório." });

    reservaController.adicionarReserva(attributes)
        .then((result) => {
            if(result) return res.status(400).json({message: result})
            return res.status(201).json({ message: "Reserva criada com sucesso." });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Erro ao criar a reserva" });
        });
});

routes.put('/:id', authentication, (req, res) => {
    const { id } = req.params;
    const attributes = req.body;

    reservaController.atualizarReserva(id, attributes)
        .then((result) => {
            if (result) return res.status(400).json({ message: result });
            return res.status(200).json({ message: "Reserva atualizada com sucesso." });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Erro ao atualizar a reserva." });
        });
});

routes.delete('/:id', authentication, (req, res) => {
    const { id } = req.params;

    reservaController.deletarReserva(id)
        .then((result) => {
            if (result === 0) return res.status(404).json({ message: "Reserva não encontrada." });
            return res.status(200).json({ message: "Reserva deletada com sucesso" });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Erro ao deletar a reserva." })
        })
});

module.exports = routes