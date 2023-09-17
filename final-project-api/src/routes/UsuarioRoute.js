const express = require('express');
const routes = express.Router();

const usuarioController = require('../controllers/UsuarioController');

const authentication = require('../middlewares/authMiddleware');

// Cadastro de usuário
routes.post('/signin', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) return res.status(400).json({ message: "Email e senha são obrigatórios!" });

    usuarioController.signIn(email, senha)
        .then((result) => {
            return res.status(201).json({ message: "Login realizado com sucesso.", result });
        })
        .catch((error) => {
            console.log(error.message);
            return res.status(400).json({error: error.message} );
        })
});

routes.post('/signup', (req, res) => {
    const { senha, ...attributes } = req.body
    if (!attributes.nome_completo) res.status(400).json({ message: "O nome completo é obrigatório!" });
    if (!attributes.email) res.status(400).json({ message: "O email é obrigatório!" });
    if (!attributes.data_nascimento) res.status(400).json({ message: "A data de nascimento é obrigatória!" });
    if (!attributes.cep) res.status(400).json({ message: "O cep é obrigatório!" });
    if (!senha) return res.status(400).json({ message: "A senha é obrigatória!" })

    usuarioController.signUp(attributes, senha)
        .then((result) => {
            return res.status(200).json({ message: "Cadastro realizado com sucesso.", result });
        })
        .catch((error) => {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
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

routes.get('/:id', authentication, (req, res) => {
    const { id } = req.params
    usuarioController.buscarUsuarioID(id)
        .then((result) => {
            if (!result) return res.status(404).json({ message: "Nenhum usuário foi encontrado." })
            return res.status(200).json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: 'Erro ao buscar o usuário.' })
        })
});

routes.put('/:id', authentication, (req, res) => {
    const {id} = req.params;
    const attributes = req.body;
    usuarioController.updateUsuario(id, attributes)
        .then((result) => {
            if (result) return res.status(404).json({ message: result });
            return res.status(200).json({ message: "Usuário atualizado com sucesso." });
        })
        .catch ((error) => {
            console.log(error);
            return res.status(500).json({message: "Erro ao atualizar o usuário."})
        })
})

routes.delete('/:id', authentication, (req, res) => {
    const { id } = req.params;
    usuarioController.deleteUsuario(id)
        .then((result) => {
            if (!result === 0) return res.status(404).json({ message: "Usuário não encontrado. Verifique o ID." });
            return res.status(200).json({ message: "Usuario deletado com sucesso." });
        })
        .catch ((error) => {
            console.log(error);
            return res.status(500).json({ message: 'Erro ao deletar o usuário.' })
        });
            
})

module.exports = routes