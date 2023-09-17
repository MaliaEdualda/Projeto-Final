const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../database/models/Usuario");

const { TOKEN_SECRET, SALT } = require("../../environment");

class UsuarioController {
  // SignIn
  async signIn(email, senha) {
    // Verifica a existência do usuário
    const usuario = await Usuario.findOne({ where: { email: email } });

    if (!usuario) throw new Error("Email ou senha incorretos!");

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) throw new Error("Email ou senha incorretos!");

    // Gera token de acesso}
    const tokenAcesso = jwt.sign({ id: usuario.id }, TOKEN_SECRET, {
      expiresIn: "2h",
    });
    return tokenAcesso;
  }

  // SignUp
  async signUp(attributes, senha) {
    //Verifica se já existe o email registrado
    const usuarioExistente = await Usuario.findOne({
      where: { email: attributes.email },
    });
    if (usuarioExistente)
      throw new Error(
        "Este email já corresponde à um usuário. Utilize outro email."
      );

    // Criptografa a senha inserida
    const hashedSenha = await bcrypt.hash(senha, SALT);
    const usuario = await Usuario.create({ ...attributes, senha: hashedSenha });

    // Gera token de acesso
    const tokenAcesso = jwt.sign({ id: usuario.id }, TOKEN_SECRET, {
      expiresIn: "2h",
    });
    return tokenAcesso;
  }

  async buscarUsuarios() {
    const usuarios = await Usuario.findAll({
      order: [["nome_completo", "ASC"]],
      attributes: { exclude: ["senha"] },
    });
    return usuarios;
  }

  async buscarUsuarioID(idUsuario) {
    const usuario = await Usuario.findByPk(idUsuario, {attributes: {exclude: ['senha']}});
    return usuario;
  }

  async updateUsuario(idUsuario, attributes) {
    const usuario = await Usuario.findByPk(idUsuario);
    if(!usuario) return "Este usuário não existe";
    
    if (!attributes.nome_completo) attributes.nome_completo = usuario.nome_completo;
    if (!attributes.email) attributes.email = usuario.email;
    if (!attributes.data_nascimento) attributes.data_nascimento = usuario.data_nascimento;
    if (!attributes.cep) attributes.cep = usuario.cep;
    if (!attributes.telefone) attributes.telefone = usuario.telefone;
    if (!attributes.senha) attributes.senha = usuario.senha;

    if(attributes.senha !== usuario.senha) {
        const hashedSenha = await bcrypt.hash(attributes.senha, SALT);
        attributes.senha = hashedSenha
    }

    await usuario.update({...attributes});
  }

  async deleteUsuario(idUsuario) {
    const usuarioDeletado = await Usuario.destroy({where: {id: idUsuario}});

    return usuarioDeletado;
  }
}

module.exports = new UsuarioController();
