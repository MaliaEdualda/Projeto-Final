const express = require('express');
const routes = express.Router();

const reservaController = require('../controllers/ReservaEquipamentoController');

const authentication = require('../middlewares/authMiddleware');

routes.get('/contar', authentication, (req, res) => {
    reservaController.contarReservas()
        .then((result) => {
            if (result === 0) res.status(404).json({ message: "Não existe nenhuma reserva cadastrada." })
            return res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error);
            if (error.message === "connect ECONNREFUSED ::1:5432") return res.status(500).json({status: "500", error: "Nosso sistema está fora do ar. Aguarde a resolução do problema."} );
            res.status(500).json({ message: "Erro ao buscar as reservas." })
        })
});

routes.get('/contar-por-periodo', authentication, (req, res) => {
    reservaController.reservasPorAnoMes()
        .then((result) => {
            if (result === 0) res.status(404).json({ message: "Não existe nenhuma reserva cadastrada." })
            return res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error);
            if (error.message === "connect ECONNREFUSED ::1:5432") return res.status(500).json({status: "500", error: "Nosso sistema está fora do ar. Aguarde a resolução do problema."} );
            res.status(500).json({ message: "Erro ao buscar as reservas." })
        })
});

routes.get('/:id', authentication, async (req, res) => {
    const { id } = req.params;
    reservaController.buscarReservasUsuario(id)
        .then((result) => {
            if (typeof result === "string") return res.status(404).json({ message: result })
            return res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error);
            if (error.message === "connect ECONNREFUSED ::1:5432") return res.status(500).json({status: "500", error: "Nosso sistema está fora do ar. Aguarde a resolução do problema."} );
            res.status(500).json({ message: "Erro ao buscar as reservas." })
        });
});

routes.post('/', authentication, (req, res) => {
    const attributes = req.body;

    if (!attributes.equipamentoDidaticoId) return res.status(400).json({ message: "O ID do equipamento é obrigatório." });
    if (!attributes.usuarioId) return res.status(400).json({ message: "O ID do usuário é obrigatório." });
    if (!attributes.data_reserva) return res.status(400).json({ message: "A data da reserva é obrigatória." });
    if (!attributes.razao_reserva) return res.status(400).json({ message: "A razão da reserva é obrigatória." });
    if (!attributes.previsao_devolucao) return res.status(400).json({ message: "A data de previsão da devolução é obrigatória." });

    reservaController.adicionarReserva(attributes)
        .then((result) => {
            if (result) return res.status(400).json({ message: result })
            return res.status(201).json({ message: "Reserva criada com sucesso." });
        })
        .catch((error) => {
            console.log(error);
            if (error.message === "connect ECONNREFUSED ::1:5432") return res.status(500).json({status: "500", error: "Nosso sistema está fora do ar. Aguarde a resolução do problema."} );
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
            if (error.message === "connect ECONNREFUSED ::1:5432") return res.status(500).json({status: "500", error: "Nosso sistema está fora do ar. Aguarde a resolução do problema."} );
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
            if (error.message === "connect ECONNREFUSED ::1:5432") return res.status(500).json({status: "500", error: "Nosso sistema está fora do ar. Aguarde a resolução do problema."} );
            return res.status(500).json({ message: "Erro ao deletar a reserva." })
        })
});

module.exports = routes