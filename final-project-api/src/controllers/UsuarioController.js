const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../database/models/Usuario');

const { TOKEN_SECRET, SALT } = require('../../environment');

class UsuarioController {
    // SignIn
    async signIn(email, senha) {
        // Verifica a existência do usuário
        const usuario = await Usuario.findOne({ where: { email: email } });
        if (!usuario) throw new Error ("Este email não corresponde a nenhum usuário.");

        // Verifica a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) throw new Error ("Senha inválida!");

        // Gera token de acesso 
        const tokenAcesso = jwt.sign({ id: usuario.id }, TOKEN_SECRET, { expiresIn: '2h' });
        return tokenAcesso;
    }

    // SignUp
    async signUp(attributes, senha) {
        //Verifica se já existe o email registrado
        const usuarioExistente = await Usuario.findOne({ where: { email: attributes.email } });
        if (usuarioExistente) throw new Error ("Este email já corresponde à um usuário. Utilize outro email.")

        // Criptografa a senha inserida
        const hashedSenha = await bcrypt.hash(senha, SALT);
        const usuario = await Usuario.create({ ...attributes, senha: hashedSenha });

        // Gera token de acesso 
        const tokenAcesso = jwt.sign({ id: usuario.id }, TOKEN_SECRET, { expiresIn: '2h' });
        return tokenAcesso;
    }

    async buscarUsuarios() {
        const usuarios = await Usuario.findAll({ order: [["nome_completo", "ASC"]], attributes: { exclude: ["senha"] } });
        return usuarios;
    }

    async buscarUsuarioID(idUsuario) {
        const usuario = await Usuario.findByPk(idUsuario);
        return usuario;
    }
}

module.exports = new UsuarioController();