// ARRUMAR O CÓDIGO

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../database/models/Usuario');

const { TOKEN_SECRET, SALT } = require('../../ambiente');

class UsuarioController {
    // SignIn
    async signIn(nome, senha) {
        // Verifica a existência do usuário
        const usuario = await Usuario.findOne({ where: { nome: nome } });
        if (!usuario) {
            throw new Error("Este usuário não existe")
        }

        // Verifica a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) throw new Error("Senha inválida!")

        // Gera token de acesso 
        const tokenAcesso = jwt.sign({ id: usuario.id }, TOKEN_SECRET, { expiresIn: 600 });

        return tokenAcesso
    }

    // SignUp
    async signUp(nome, senha) {
        // Criptografa a senha inserida
        const hashedSenha = await bcrypt.hash(senha, SALT);

        await Usuario.create({ nome: nome, senha: hashedSenha })
    }

    async buscarUsuarios() {
        const usuarios = await Usuario.findAll({ attributes: { exclude: ["senha"] } })
        return usuarios
    }
}

module.exports = new UsuarioController();