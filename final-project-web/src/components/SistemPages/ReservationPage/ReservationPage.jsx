import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import {
  getReservations,
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../../../services/reservation-service";
import { getUserById } from "../../../services/user-service";
import { ReservationModal } from "../ReservationModal/ReservationModal";
import { Modal } from "react-bootstrap";
import { LeftMenu } from "../LeftMenu/LeftMenu";
import EditIcon from "../../../images/icons/EditIcon.png";
import CancelIcon from "../../../images/icons/CancelIcon.png";
import CheckIcon from "../../../images/icons/CheckIcon.png";
import WarningIcon from "../../../images/icons/WarningIcon.png";
import AddIcon from "../../../images/icons/AddIcon.png";
import SuccessIcon from "../../../images/icons/SuccessIcon.png";
import Logo from "../../../images/logo.png";
import "./styles.css";

export default function ReservationPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUpdating, setCurrentUpdating] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isCompleting, setIsCompleting] = useState(null);
  const [user, setUser] = useState("");
  const [userReservas, setUserReservas] = useState();
  const [allReservas, setAllReservas] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const user = jwt_decode(token);
      const result = await getUserById(user.id);
      setUser(result);
    } catch (error) {
      console.log(error);
      if (error.response.data.status === "500")
        setError({ message: error.response.data.error });
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
      setUserReservas(result.data);
    } catch (error) {
      setUserReservas([]);
      console.log(error);
      if (error.response.data.status === "500")
        setError({ message: error.response.data.error });
    }
  };

  const setAllReservations = async () => {
    try {
      const result = await getAllReservations();
      setAllReservas(result.data);
      console.log(result);
    } catch (error) {
      setAllReservas([]);
      console.log(error);
      if (error.response.data.status === "500")
        setError({ message: error.response.data.error });
    }
  };

  const addReservation = async (data) => {
    try {
      data.usuarioId = user.id;
      await createReservation(data);
      await setReservations();
      setModalOpen(false);
      setSuccess({ message: "criar" });
    } catch (error) {
      console.log(error);
      if (error.response.data.status === "500")
        setError({ message: error.response.data.error });
      setError(error.response.data);
    }
  };

  const editReservation = async (data) => {
    try {
      await updateReservation(data);
      setModalOpen(false);
      setCurrentUpdating(null);
      await setReservations();
      setSuccess({ message: "editar" });
    } catch (error) {
      console.log(error);
      if (error.response.data.status === "500")
        setError({ message: error.response.data.error });
      setError(error.response.data);
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
      if (error.response.data.status === "500")
        setError({ message: error.response.data.error });
    }
  };

  const removeReservation = async (id) => {
    try {
      await deleteReservation(id);
      await setReservations();
      setIsDeleting(null);
      setSuccess({ message: "cancelar" });
    } catch (error) {
      console.log(error);
      if (error.response.data.status === "500")
        setError({ message: error.response.data.error });
    }
  };

  useEffect(() => {
    setReservations();
    setAllReservations();
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
                <button
                  className="submit-modal-button"
                  onClick={() => {
                    setError(null);
                  }}
                >
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

            {/* MODAL DE COMPLETAR RESERVA */}
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

            {/*MODAL DE SUCESSO */}
            {!!success && (
              <Modal
                show={!!success}
                onHide={() => {
                  setSuccess(null);
                }}
              >
                <Modal.Header>
                  <h1 className="success-modal-title">Sucesso!</h1>
                </Modal.Header>
                <Modal.Body>
                  <div className="success-modal-content">
                    <img src={SuccessIcon} alt="Logo de sucesso na operação." />
                    <h1 className="success-modal-content-text">
                      Sucesso ao {success.message} a reserva.
                    </h1>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="close-success-modal-button"
                    onClick={() => {
                      setSuccess(null);
                    }}
                  >
                    OK
                  </button>
                </Modal.Footer>
              </Modal>
            )}

            {/* MODAL DE ADIÇÃO E EDIÇÃO */}
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
              <h1>
                {`Olá, ${user.nome_completo
                  ?.split(" ")
                  .shift()}. Dê uma olhada nas reservas.`}
              </h1>
              <button
                className="create-reservation-button"
                onClick={() => setModalOpen(true)}
              >
                <img src={AddIcon} alt="Ícone de adicionar" />
                Solicitar reserva
              </button>
            </div>

            {user?.cargo === "Admin" ? (
              <div style={{minHeight: "80%", marginBottom: "1%"}}>
                <div className="reservation-table-container" style={{minHeight: "45%"}}>
                  <h2>Reservas em andamento: </h2>
                  {allReservas && allReservas.length > 0 ? (
                    <table className="reservation-table-content">
                      <thead className="reservation-table-head">
                        <tr>
                          <th
                            className="reservation-table-head-content"
                            scope="col"
                          >
                            USUÁRIO
                          </th>
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
                        </tr>
                      </thead>
                      <tbody>
                        {allReservas.map(
                          (reserva, index) =>
                            reserva.usuarioId !== user.id &&
                            reserva.status_reserva !== "Concluída" && (
                              <tr key={reserva.id}>
                                <td className="table-row-content">
                                  {reserva.Usuario.nome_completo}
                                </td>
                                <td className="table-row-content">
                                  {reserva.EquipamentoDidatico.nome_equipamento}
                                </td>
                                <td className="table-row-content">
                                  {parseDate(reserva.data_reserva)}
                                </td>
                                <td className="table-row-content">
                                  {reserva.razao_reserva}
                                </td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <p className="non-data-text">
                      Nenhuma reserva em andamento encontrada.
                    </p>
                  )}
                </div>

                <div className="reservation-table-container" style={{minHeight: "45%"}}>
                  <h2>Reservas concluídas: </h2>
                  {allReservas && allReservas.length > 0 ? (
                    <table className="reservation-table-content">
                      <thead className="reservation-table-head">
                        <tr>
                          <th
                            className="reservation-table-head-content"
                            scope="col"
                          >
                            USUÁRIO
                          </th>
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
                        {allReservas.map(
                          (reserva, index) =>
                            reserva.usuarioId !== user.id &&
                            reserva.status_reserva === "Concluída" && (
                              <tr key={reserva.id}>
                                <td className="table-row-content">
                                  {reserva.Usuario.nome_completo}
                                </td>
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
                      Nenhuma reserva em andamento encontrada.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p> </p>
            )}

            <div className="reservation-table-container">
              <h2>Suas reservas em andamento: </h2>
              {userReservas && userReservas.length > 0 ? (
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
                    {userReservas.map(
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
                  Nenhuma reserva em andamento encontrada.
                </p>
              )}
            </div>
            <div className="reservation-table-container">
              <h2>Suas reservas concluídas: </h2>
              {userReservas && userReservas.length > 0 ? (
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
                    {userReservas.map(
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
                  Nenhuma reserva conluída encontrada.
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
