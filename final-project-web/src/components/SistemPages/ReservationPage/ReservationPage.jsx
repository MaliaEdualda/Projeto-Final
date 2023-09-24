import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../../../services/reservation-service";
import { getUserById } from "../../../services/userService";
import { ReservationModal } from "../ReservationModal/ReservationModal";
import { Modal } from "react-bootstrap";
import { LeftMenu } from "../LeftMenu/LeftMenu";
import EditIcon from "../../../images/icons/EditIcon.png";
import CancelIcon from "../../../images/icons/CancelIcon.png";
import CheckIcon from "../../../images/icons/CheckIcon.png";
import WarningIcon from "../../../images/icons/WarningIcon.png";
import AddIcon from "../../../images/icons/AddIcon.png";
import Logo from "../../../images/logo.png";
import "./styles.css";

export default function ReservationPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUpdating, setCurrentUpdating] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isCompleting, setIsCompleting] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const [reservas, setReservas] = useState();

  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const user = jwt_decode(token);
      const result = await getUserById(user.id);
      setUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  const startEditing = (data) => {
    setCurrentUpdating(data);
    setModalOpen(true);
  };

  const setReservations = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const user = jwt_decode(token);
      const result = await getReservations(user.id);
      setReservas(result.data);
    } catch (error) {
      setReservas([]);
      console.log(error);
    }
  };

  const addReservation = async (data) => {
    try {
      data.usuarioId = user.id;
      await createReservation(data);
      await setReservations();
      setModalOpen(false);
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    } finally {
    }
  };

  const editReservation = async (data) => {
    try {
      await updateReservation(data);
      setModalOpen(false);
      setCurrentUpdating(null);
      await setReservations();
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  };

  const completeReservation = async (data) => {
    try {
      data.status_reserva = "Concluída";
      data.data_devolucao = new Date();
      await updateReservation(data);
      await setReservations();
      setIsCompleting(null);
    } catch (error) {
      console.log(error);
    }
  };

  const removeReservation = async (id) => {
    try {
      await deleteReservation(id);
      await setReservations();
      setIsDeleting(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setReservations();
    getUser();
  }, []);

  return (
    <div className="full-page">
      <div className="top-bar">
        <div className="logo-component">
          <img className="logo-image-main" src={Logo} alt="Logo do sistema" />
          <div className="logo-text-component">
            <h1>SIGED MT</h1>
          </div>
        </div>
      </div>
      <div className="main-page">
        <LeftMenu className="left-menu" />
        <div className="reservation-page">
          <div className="reservation-area">

            {/*MODAL DE ERRO */}
            <Modal
              show={error}
              onHide={() => {
                setError(null);
              }}
            >
              <Modal.Body>
                <h1 className="error-modal-content-text">{error?.message}</h1>
              </Modal.Body>
              <Modal.Footer>
                <button className="submit-modal-button"
                onClick={() => {
                  setError(null);
                }}>
                  OK.
                </button>
              </Modal.Footer>
            </Modal>

            {/* MODAL DE EXCLUSÃO */}
            <Modal
              show={!!isDeleting}
              onHide={() => {
                setIsDeleting(null);
              }}
            >
              <Modal.Header>
                <h1 className="modal-header-content">
                  Deletar reserva de{" "}
                  {isDeleting?.EquipamentoDidatico.nome_equipamento}?
                </h1>
              </Modal.Header>
              <Modal.Body>
                <div className="delete-modal-content-container">
                  <img
                    className="delete-modal-icon"
                    src={WarningIcon}
                    alt="Ícone de aviso"
                  />
                  <h1 className="delete-modal-content-text">
                    Atenção! Ao realizar esta ação, você não terá mais essa
                    reserva em seu nome.
                  </h1>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="delete-modal-button"
                  onClick={() => removeReservation(isDeleting.id)}
                >
                  Cancelar
                </button>
                <button
                  className="cancel-modal-button"
                  onClick={() => setIsDeleting(null)}
                >
                  Voltar
                </button>
              </Modal.Footer>
            </Modal>

            {/* MODAL DE DE COMPLETAR RESERVA */}
            <Modal
              show={!!isCompleting}
              onHide={() => {
                setIsCompleting(null);
              }}
            >
              <Modal.Header>
                <h1 className="complete-modal-header-content">
                  Concluir a reserva de{" "}
                  {isCompleting?.EquipamentoDidatico.nome_equipamento}?
                </h1>
              </Modal.Header>
              <Modal.Body>
                <h1 className="complete-modal-content-text">
                  Deseja concluir esta reserva?
                </h1>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="submit-modal-button"
                  onClick={() => completeReservation(isCompleting)}
                >
                  Concluir
                </button>
                <button
                  className="cancel-modal-button"
                  onClick={() => setIsCompleting(null)}
                >
                  Cancelar
                </button>
              </Modal.Footer>
            </Modal>
            {modalOpen && (
              <ReservationModal
                data={currentUpdating}
                isOpen={modalOpen}
                closeFunction={() => {
                  setModalOpen(false);
                  setCurrentUpdating(null);
                }}
                addReservation={addReservation}
                editReservation={editReservation}
              />
            )}
            <div className="reservation-page-title">
              <h1>{`Olá, ${user.nome_completo
                ?.split(" ")
                .shift()}. Dê uma olhada nas suas reservas.`}</h1>
              <button
                className="create-reservation-button"
                onClick={() => setModalOpen(true)}
              >
                <img src={AddIcon} alt="Ícone de adicionar" />
                Solicitar reserva
              </button>
            </div>
            <div className="reservation-table-container">
              <h2 className="">Em andamento: </h2>
              {reservas && reservas.length > 0 ? (
                <table className="reservation-table-content">
                  <thead className="reservation-table-head">
                    <tr>
                      <th
                        className="reservation-table-head-content"
                        scope="col"
                      >
                        EQUIPAMENTO
                      </th>
                      <th
                        className="reservation-table-head-content"
                        scope="col"
                      >
                        DATA RESERVA
                      </th>
                      <th
                        className="reservation-table-head-content"
                        scope="col"
                      >
                        RAZÃO RESERVA
                      </th>
                      <th
                        className="reservation-table-head-content"
                        scope="col"
                      >
                        PREVISÃO DEVOLUÇÃO
                      </th>
                      <th
                        className="reservation-table-head-content"
                        scope="col"
                      >
                        {" "}
                      </th>
                      <th
                        className="reservation-table-head-content"
                        scope="col"
                      >
                        {" "}
                      </th>
                      <th
                        className="reservation-table-head-content"
                        scope="col"
                      >
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas.map(
                      (reserva, index) =>
                        reserva.status_reserva !== "Concluída" && (
                          <tr key={reserva.id}>
                            <td className="table-row-content">
                              {reserva.EquipamentoDidatico.nome_equipamento}
                            </td>
                            <td className="table-row-content">
                              {parseDate(reserva.data_reserva)}
                            </td>
                            <td className="table-row-content">
                              {reserva.razao_reserva}
                            </td>
                            <td className="table-row-content">
                              {parseDate(reserva.previsao_devolucao)}
                            </td>
                            <td className="table-row-content">
                              <button
                                className="reservation-row-button"
                                onClick={() => {
                                  startEditing(reserva);
                                }}
                              >
                                <img
                                  className="reservation-row-icon"
                                  src={EditIcon}
                                  alt="Ícone Editar Reserva"
                                />
                              </button>
                            </td>
                            <td className="table-row-content">
                              <button
                                className="reservation-row-button"
                                onClick={() => {
                                  setIsCompleting(reserva);
                                }}
                              >
                                <img
                                  className="reservation-row-icon"
                                  src={CheckIcon}
                                  alt="Ícone Completar Reserva"
                                />
                              </button>
                            </td>
                            <td className="table-row-content">
                              <button
                                className="reservation-row-button"
                                onClick={() => {
                                  setIsDeleting(reserva);
                                }}
                              >
                                <img
                                  className="reservation-row-icon"
                                  src={CancelIcon}
                                  alt="Ícone Cancelar Reserva"
                                />
                              </button>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              ) : (
                <p className="non-data-text">
                  Não há nenhuma reserva em andamento no seu nome.
                </p>
              )}
            </div>
            <div className="reservation-table-container">
              <h2>Concluídas: </h2>
              {reservas && reservas.length > 0 ? (
                <table className="reservation-table-content">
                  <thead className="reservation-table-head">
                    <tr>
                      <th
                        className="reservation-table-head-content"
                        scope="col"
                      >
                        EQUIPAMENTO
                      </th>
                      <th
                        className="reservation-table-head-content"
                        scope="col"
                      >
                        DATA RESERVA
                      </th>
                      <th
                        className="reservation-table-head-content"
                        scope="col"
                      >
                        RAZÃO RESERVA
                      </th>
                      <th
                        className="reservation-table-head-content"
                        scope="col"
                      >
                        DATA CONCLUSÃO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservas.map(
                      (reserva, index) =>
                        reserva.status_reserva === "Concluída" && (
                          <tr key={reserva.id}>
                            <td className="table-row-content">
                              {reserva.EquipamentoDidatico.nome_equipamento}
                            </td>
                            <td className="table-row-content">
                              {parseDate(reserva.data_reserva)}
                            </td>
                            <td className="table-row-content">
                              {reserva.razao_reserva}
                            </td>
                            <td className="table-row-content">
                              {parseDate(reserva.data_devolucao)}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              ) : (
                <p className="non-data-text">
                  Não há nenhuma reserva concluída em seu nome.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const months = [
  "jan.",
  "fev.",
  "mar.",
  "abr.",
  "mai.",
  "jun.",
  "jul.",
  "ago.",
  "set.",
  "out.",
  "nov.",
  "dez.",
];

const parseDate = (date) => {
  const data = new Date(date);
  return `${data.getUTCDate()} de ${
    months[data.getUTCMonth()]
  } de ${data.getFullYear()}`;
};
