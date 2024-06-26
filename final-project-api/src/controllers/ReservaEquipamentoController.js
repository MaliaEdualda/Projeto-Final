const { Op } = require("sequelize");
const EquipamentoDidatico = require("../database/models/EquipamentoDidatico");
const ReservaEquipamento = require("../database/models/ReservaEquipamento");
const Usuario = require("../database/models/Usuario");

class ReservaEquipamentoController {
  async contarReservas() {
    const reservas = await ReservaEquipamento.count();

    return reservas;
  }

  async buscarReservasEmAndamento(attributes) {
    let query = { reserva: { status_reserva: { [Op.ne]: "Concluída"} }, usuario:{}, equipamento:{} }

    if (attributes.nome_completo) query.usuario.nome_completo = {
      [Op.like]: `%${attributes.nome_completo}%`
    }

    if (attributes.nome_equipamento) query.equipamento.nome_equipamento = {
      [Op.like]: `%${attributes.nome_equipamento}%`
    }

    if (attributes.data_reserva) {
      query.reserva.data_devolucao = attributes.data_reserva
    }

    const reservas = await ReservaEquipamento.findAll({
      include: [
        {
          model: EquipamentoDidatico,
          where: {...query.equipamento},
          required: true,
          attributes: ["nome_equipamento"],
        },
        {
          model: Usuario,
          where: {...query.usuario},
          required: true,
          attributes: ["nome_completo"],
        },
      ],
      where: {...query.reserva},
      order: [["data_reserva", "ASC"]],
    });

    return reservas;
  }

  async buscarReservasConcluidas(attributes) {
    let query = { reserva: {status_reserva: "Concluída"}, usuario:{}, equipamento:{} }

    if (attributes.nome_completo_concluido) query.usuario.nome_completo = {
      [Op.like]: `%${attributes.nome_completo_concluido}%`
    }

    if (attributes.nome_equipamento_concluido) query.equipamento.nome_equipamento = {
      [Op.like]: `%${attributes.nome_equipamento_concluido}%`
    }

    if (attributes.data_devolucao) {
      query.reserva.data_devolucao = attributes.data_devolucao
    }
    
    const reservas = await ReservaEquipamento.findAll({
      include: [
        {
          model: EquipamentoDidatico,
          where: {...query.equipamento},
          required: true,
          attributes: ["nome_equipamento"],
        },
        {
          model: Usuario,
          where: {...query.usuario},
          required: true,
          attributes: ["nome_completo"],
        },
      ],
      where: {...query.reserva},
      order: [["data_reserva", "ASC"]],
    });

    return reservas;
  }

  async buscarReservasUsuario(usuarioId) {
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) return "Este id não corresponde a nenhum usuário.";

    const reservas = await ReservaEquipamento.findAll({
      where: { usuarioId: usuarioId },
      include: [
        {
          model: EquipamentoDidatico,
          required: true,
          attributes: ["nome_equipamento"],
        },
        {
          model: Usuario,
          required: true,
          attributes: ["nome_completo"],
        },
      ],
      order: [["data_reserva", "ASC"]],
    });

    if (reservas.length === 0) return "Nenhuma reserva encontrada.";

    return reservas;
  }

  async reservasPorAnoMes() {
    const [result, metadata] = await ReservaEquipamento.sequelize.query(
      'SELECT EXTRACT(month from r.data_reserva) AS "mes", COUNT(id) AS "count"' +
        ' FROM public."ReservaEquipamento" r' +
        " WHERE EXTRACT(year from r.data_reserva) = EXTRACT(year from current_date)" +
        " GROUP BY EXTRACT(month from r.data_reserva);"
    );

    return result;
  }

  async adicionarReserva(attributes) {
    const equipamento = await EquipamentoDidatico.findByPk(
      attributes.equipamentoDidaticoId
    );
    if (!equipamento)
      return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

    const usuario = await Usuario.findByPk(attributes.usuarioId);
    if (!usuario)
      return "Este ID não corresponde a nenhum usuário. Verifique o ID.";

    const reservas = await ReservaEquipamento.findAll({
      where: {
        usuarioId: attributes.usuarioId,
        status_reserva: { [Op.ne]: "Concluída" },
      },
      include: [
        {
          model: EquipamentoDidatico,
          required: true,
          attributes: ["nome_equipamento"],
        },
        {
          model: Usuario,
          required: true,
          attributes: ["nome_completo"],
        },
      ],
      order: [["id", "ASC"]],
    });

    if (reservas.length === 3)
      return "Você já possui o limite de reservas em andamento.";

    //Verifica se o equipamento já está reservado para o dia selecionado pelo usuário
    const buscarDatasIntervalo = (dataInicio, dataFim) => {
      const data = new Date(dataInicio.getTime());

      const datas = [];

      while (data <= dataFim) {
        datas.push(new Date(data));
        data.setDate(data.getDate() + 1);
      }

      return datas;
    };

    let equipamentoAlreadyReservado = await ReservaEquipamento.findAll({
      where: {
        equipamentoDidaticoId: attributes.equipamentoDidaticoId,
        status_reserva: { [Op.ne]: "Concluída" },
      },
    });

    const data_reserva = [];
    equipamentoAlreadyReservado.map((reserva, index) => {
      data_reserva.push(new Date(reserva.dataValues.data_reserva));
    });

    const previsao_devolucao = [];
    equipamentoAlreadyReservado.map((reserva, index) => {
      previsao_devolucao.push(new Date(reserva.dataValues.previsao_devolucao));
    });

    let intervalo = [[]];
    for (let i = 0; i < data_reserva.length; i++) {
      intervalo[i] = buscarDatasIntervalo(
        data_reserva[i],
        previsao_devolucao[i]
      );
    }

    let flag = 0;
    let data = new Date(attributes.data_reserva);
    for (let i = 0; i < intervalo.length; i++) {
      for (let j = 0; j < intervalo[i].length; j++) {
        if (data.getTime() === intervalo[i][j].getTime()) {
          flag++;
        }
      }
    }

    let flag2 = 0;
    data = new Date(attributes.previsao_devolucao);
    for (let i = 0; i < intervalo.length; i++) {
      for (let j = 0; j < intervalo[i].length; j++) {
        if (data.getTime() === intervalo[i][j].getTime()) {
          flag++;
        }
      }
    }

    if (flag) return "Este equipamento já está reservado para esta data.";

    if (flag2)
      return "A previsão de devolução entra em conflito com outra reserva. Diminua o tempo de reserva";

    await ReservaEquipamento.create(attributes);
  }

  async atualizarReserva(idReserva, attributes) {
    const reserva = await ReservaEquipamento.findByPk(idReserva);
    if (!reserva)
      return "Este ID não corresponde a nenhuma reserva. Verifique o ID.";

    if (!attributes.equipamentoDidaticoId)
      attributes.equipamentoDidaticoId = reserva.equipamentoDidaticoId;
    const equipamento = await EquipamentoDidatico.findByPk(
      attributes.equipamentoDidaticoId
    );
    if (!equipamento)
      return "Este ID não corresponde a nenhum equipamento didático. Verifique o ID.";

    if (!attributes.usuarioId) attributes.usuarioId = reserva.usuarioId;
    const usuario = await Usuario.findByPk(attributes.usuarioId);
    if (!usuario)
      return "Este ID não corresponde a nenhum usuário. Verifique o ID.";

    if (!attributes.data_reserva)
      attributes.data_reserva = reserva.data_reserva;
    if (!attributes.razao_reserva)
      attributes.razao_reserva = reserva.razao_reserva;
    if (!attributes.previsao_devolucao)
      attributes.previsao_devolucao = reserva.previsao_devolucao;
    if (!attributes.data_devolucao)
      attributes.data_devolucao = reserva.data_devolucao;
    if (!attributes.status_reserva)
      attributes.status_reserva = reserva.status_reserva;

    //Verifica se o equipamento já está reservado para o dia selecionado pelo usuário
    const buscarDatasIntervalo = (dataInicio, dataFim) => {
      const data = new Date(dataInicio.getTime());

      const datas = [];

      while (data <= dataFim) {
        datas.push(new Date(data));
        data.setDate(data.getDate() + 1);
      }

      return datas;
    };

    let equipamentoAlreadyReservado = await ReservaEquipamento.findAll({
      where: {
        id: { [Op.ne]: idReserva },
        equipamentoDidaticoId: attributes.equipamentoDidaticoId,
        status_reserva: { [Op.ne]: "Concluída" },
      },
    });

    const data_reserva = [];
    equipamentoAlreadyReservado.map((reserva, index) => {
      data_reserva.push(new Date(reserva.dataValues.data_reserva));
    });

    const previsao_devolucao = [];
    equipamentoAlreadyReservado.map((reserva, index) => {
      previsao_devolucao.push(new Date(reserva.dataValues.previsao_devolucao));
    });

    let intervalo = [[]];
    for (let i = 0; i < data_reserva.length; i++) {
      intervalo[i] = buscarDatasIntervalo(
        data_reserva[i],
        previsao_devolucao[i]
      );
    }

    let flag = 0;
    let data = new Date(attributes.data_reserva);
    for (let i = 0; i < intervalo.length; i++) {
      for (let j = 0; j < intervalo[i].length; j++) {
        if (data.getTime() === intervalo[i][j].getTime()) {
          flag++;
        }
      }
    }

    let flag2 = 0;
    data = new Date(attributes.previsao_devolucao);
    for (let i = 0; i < intervalo.length; i++) {
      for (let j = 0; j < intervalo[i].length; j++) {
        if (data.getTime() === intervalo[i][j].getTime()) {
          flag2++;
        }
      }
    }

    if (flag) return "Este equipamento já está reservado para esta data.";

    if (flag2)
      return "A previsão de devolução entra em conflito com outra reserva. Diminua o tempo de reserva.";

    if (attributes.data_devolucao) {
      let datareserva = new Date(attributes.data_reserva);
      let dataconclusao = new Date(attributes.data_devolucao);
      if (dataconclusao.getTime() < datareserva.getTime())
        return "Você não pode concluir uma reserva antes de acontecer.";
    }

    await ReservaEquipamento.update(attributes, { where: { id: idReserva } });
  }

  async deletarReserva(idReserva) {
    const reservadeletada = await ReservaEquipamento.destroy({
      where: { id: idReserva },
    });

    return reservadeletada;
  }
}

module.exports = new ReservaEquipamentoController();
