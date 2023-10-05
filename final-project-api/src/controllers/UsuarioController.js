const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");
const Usuario = require("../database/models/Usuario");
const ReservaEquipamento = require("../database/models/ReservaEquipamento");

const { TOKEN_SECRET, SALT } = require("../../environment");

class UsuarioController {
  // SignIn
  async signIn(email, senha) {
    // Verifica a existência do usuário
    const usuario = await Usuario.findOne({ where: { email: email } });

    if ((!usuario) || (usuario.situacao == "INATIVO")) throw new Error("Usuário não encontrado!");

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) throw new Error("Email ou senha incorretos!");

    // Gera token de acesso}
    const tokenAcesso = jwt.sign({ id: usuario.id }, TOKEN_SECRET, {
      expiresIn: "10h",
    });
    return tokenAcesso;
  }

  // SignUp
  async signUp(attributes, senha) {
    //Verifica se já existe o email registrado
    const usuarioExistente = await Usuario.findOne({
      where: { email: attributes.email },
    });

    if (usuarioExistente?.situacao == "INATIVO") {
      const hashedSenha = await bcrypt.hash(senha, SALT);

      await Usuario.update({
        ...attributes,
        senha: hashedSenha,
        situacao: "ATIVO"
      }, {
        where: { id: usuarioExistente.id }
      });
      
      // Gera token de acesso
      const tokenAcesso = jwt.sign({ id: usuarioExistente.id }, TOKEN_SECRET, {
        expiresIn: "10h",
      });

      return tokenAcesso;

    } else {

      if (usuarioExistente?.situacao == "ATIVO")
        throw new Error(
          "Este email já corresponde à um usuário. Utilize outro email."
        );

      // Criptografa a senha inserida
      const hashedSenha = await bcrypt.hash(senha, SALT);
      const usuario = await Usuario.create({ ...attributes, senha: hashedSenha });

      // Gera token de acesso
      const tokenAcesso = jwt.sign({ id: usuario.id }, TOKEN_SECRET, {
        expiresIn: "5h",
      });

      return tokenAcesso;

    }
  }

  async buscarUsuarios() {
    const usuarios = await Usuario.findAll({
      order: [["nome_completo", "ASC"]],
      attributes: { exclude: ["senha"] },
    });
    return usuarios;
  }

  async buscarUsuarioID(idUsuario) {
    const usuario = await Usuario.findByPk(idUsuario, { attributes: { exclude: ['senha'] } });
    return usuario;
  }

  async updateUsuario(idUsuario, attributes) {
    const usuario = await Usuario.findByPk(idUsuario);
    if (!usuario) return "Este usuário não existe";

    if (usuario.situacao == "INATIVO") return "Este usuário está desativado";

    const emailExistente = await Usuario.findOne({ where: { email: attributes.email } });
    if ((emailExistente?.situacao == "ATIVO") && (emailExistente?.id !== usuario.id)) return "Este email já corresponde a um usuário. Utilize outro email.";

    if (!attributes.nome_completo) attributes.nome_completo = usuario.nome_completo;
    if (!attributes.email) attributes.email = usuario.email;
    if (!attributes.data_nascimento) attributes.data_nascimento = usuario.data_nascimento;
    if (!attributes.cep) attributes.cep = usuario.cep;
    if (!attributes.telefone) attributes.telefone = usuario.telefone;
    if (!attributes.senha) attributes.senha = usuario.senha;

    if (attributes.senha !== usuario.senha) {
      const hashedSenha = await bcrypt.hash(attributes.senha, SALT);
      attributes.senha = hashedSenha;
    }

    await usuario.update({ ...attributes });
  }

  async deleteUsuario(idUsuario) {
    const reserva_em_andamento = await ReservaEquipamento.findOne({
      where: {
        usuarioId: idUsuario,
        status_reserva: { [Op.ne]: "Concluída" }
      }
    });

    if(reserva_em_andamento) return "Você não pode excluir a sua conta com reservas em andamento."

    const usuarioDesativado = await Usuario.update(
      {
        situacao: "INATIVO"
      },
      {
        where: {
          id: idUsuario
        }
      });

    return usuarioDesativado;
  }
}

module.exports = new UsuarioController();
