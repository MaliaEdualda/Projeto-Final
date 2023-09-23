import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../../../services/reservation-service";
import { ReservationModal } from "../ReservationModal/ReservationModal";
import { Modal } from "react-bootstrap";
import { LeftMenu } from "../LeftMenu/LeftMenu";
import EditIcon from "../../../images/icons/EditIcon.png";
import CancelIcon from "../../../images/icons/CancelIcon.png";
import WarningIcon from "../../../images/icons/WarningIcon.png";
import Logo from "../../../images/logo.png";
import "./styles.css";

export default function ReservationPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUpdating, setCurrentUpdating] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [reservas, setReservas] = useState();

  const startEditing = (data) => {
    setCurrentUpdating(data);
    setModalOpen(true);
  };

  const setReservations = async () => {
    try {
      const result = await getReservations();
      setReservas(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addReservation = async (data) => {
    try {
      await createReservation(data);
      setModalOpen(false);
      await setReservations();
    } catch (error) {
      console.log(error);
    }
  };

  const editReservation = async (data) => {
    try {
      await updateReservation(data);
      setModalOpen(false);
      setCurrentUpdating(null);
      await setReservations();
    } catch (error) {
      console.log(error);
    }
  };

  const removeEquipment = async (id) => {
    try {
      await deleteReservation(id);
      setIsDeleting(null);
      await setReservations();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setReservations();
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
            {/* MODAL DE EXCLUSÃO */}
            <Modal
              show={!!isDeleting}
              onHide={() => {
                setIsDeleting(null);
              }}
            >
              <Modal.Header>
                <h1 className="modal-header-content">
                  Deletar {isDeleting?.nome_equipamento}
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
                    Atenção! Ao realizar esta ação, você não será mais capaz de
                    acessar as informações deste equipamento.
                  </h1>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="delete-modal-button"
                  onClick={() => removeEquipment(isDeleting.id)}
                >
                  Excluir
                </button>
                <button
                  className="cancel-modal-button"
                  onClick={() => setIsDeleting(null)}
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
            <h1>Olá, Fulano. Verifique as suas reservas em aberto.</h1>
            <div className="reservation-table-container">
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
                    </tr>
                  </thead>
                  <tbody>
                    {reservas.map((reserva, index) => (
                      <tr key={reserva.id}>
                        <td className="table-row-content">
                          {reserva.EquipamentoDidatico.nome_equipamento}
                        </td>
                        <td className="table-row-content">
                          {reserva.data_reserva}
                        </td>
                        <td className="table-row-content">
                          {reserva.razao_reserva}
                        </td>
                        <td className="table-row-content">
                          {reserva.previsao_devolucao}
                        </td>
                        <td className="table-row-content">
                          <button
                            className="equipment-row-button"
                            onClick={() => {
                              startEditing(reserva);
                            }}
                          >
                            <img
                              className="equipment-row-icon"
                              src={EditIcon}
                              alt="Ícone Editar Equipamento"
                            />
                          </button>
                        </td>
                        <td className="table-row-content">
                          <button
                            className="equipment-row-button"
                            onClick={() => {
                              setIsDeleting(reserva);
                            }}
                          >
                            <img
                              className="equipment-row-icon"
                              src={CancelIcon}
                              alt="Ícone Deletar Equipamento"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="non-data-text">
                  Não há nenhuma reserva em seu nome
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
