const express = require('express');
const routes = express.Router();

const usuarioController = require('../controllers/UsuarioController');

const authentication = require('../middlewares/authMiddleware');

// Cadastro de usuário
routes.post('/signup', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) return res.status(400).json({ message: "Email e senha são obrigatórios!" });

    usuarioController.signUp(nome, senha)
        .then((result) => {
            return res.status(201).json({ message: "Usuário criado com sucesso.", result })
        })
        .catch((error) => {
            console.log(error)
            res.json(500).json({ erro: "Erro ao criar o usuário." })
        })
});

routes.post('/signin', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ message: "Email e senha são obrigatórios!" })

    usuarioController.signIn(nome, senha)
        .then((result) => {
            return res.status(200).json({ message: "Login realizado com sucesso.", result })
        })
        .catch((error) => {
            console.log(error)
            return res.status(500).json({ message: "Erro ao logar o usuário." })
        })
});

routes.get('/', authentication, (req, res) => {
    usuarioController.buscarUsuarios()
        .then((result) => {
            if (result.length === 0) return res.status(404).json({ message: "Nenhum usuário foi encontrado." })
            return res.status(200).json(result)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ message: "Erro ao buscar os usuários." })
        })
});

module.exports = { routes }
