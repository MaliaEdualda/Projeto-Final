import { useState, useEffect } from "react";
import {
  getEquipments,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from "../../../services/equipmentService";
import { EquipmentModal } from "../EquipmentModal/EquipmentModal";
import { LeftMenu } from "../LeftMenu/LeftMenu";
import { Modal } from "react-bootstrap";
import Logo from "../../../images/logo.png";
import EditIcon from "../../../images/icons/EditIcon.png";
import DeleteIcon from "../../../images/icons/DeleteIcon.png";
import WarningIcon from "../../../images/icons/WarningIcon.png";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EquipmentPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUpdating, setCurrentUpdating] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [equipamentos, setEquipamentos] = useState();

  const startEditing = (data) => {
    setCurrentUpdating(data);
    setModalOpen(true);
  };

  const getEquipamentos = async () => {
    try {
      const result = await getEquipments();
      setEquipamentos(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addEquipment = async (data) => {
    try {
      await createEquipment(data);
      setModalOpen(false);
      await getEquipamentos();
    } catch (error) {
      console.log(error);
    }
  };

  const editEquipment = async (data) => {
    try {
      await updateEquipment(data);
      setModalOpen(false);
      setCurrentUpdating(null);
      await getEquipamentos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEquipamento = async (id) => {
    try {
      await deleteEquipment(id);
      setIsDeleting(null);
      await getEquipamentos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEquipamentos();
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
        <div className="equipment-page">
          <div className="equipment-area">
            <button
              className="create-equipment-button"
              onClick={() => setModalOpen(true)}
            >
              Criar Equipamento
            </button>

            {modalOpen && (
              <EquipmentModal
                data={currentUpdating}
                isOpen={modalOpen}
                closeFunction={() => {
                  setModalOpen(false);
                  setCurrentUpdating(null);
                }}
                addEquipment={addEquipment}
                editEquipment={editEquipment}
              />
            )}

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
                  onClick={() => deleteEquipamento(isDeleting.id)}
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

            <div className="table-responsive">
              {equipamentos && equipamentos.length > 0 ? (
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center" scope="col">
                        {" "}
                      </th>
                      <th className="text-center" scope="col">
                        {" "}
                      </th>
                      <th className="text-center" scope="col">
                        CÓDIGO
                      </th>
                      <th className="text-center" scope="col">
                        NOME EQUIPAMENTO
                      </th>
                      <th className="text-center" scope="col">
                        MARCA EQUIPAMENTO
                      </th>
                      <th className="text-center" scope="col">
                        TIPO EQUIPAMENTO
                      </th>
                      <th className="text-center" scope="col">
                        MODELO EQUIPAMENTO
                      </th>
                      <th className="text-center" scope="col">
                        DATA AQUISIÇÃO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipamentos.map((equipamento, index) => (
                      <tr key={equipamento.id}>
                        <td className="text-center">
                          <button
                            className="equipment-row-button"
                            onClick={() => {
                              startEditing(equipamento);
                            }}
                          >
                            <img
                              className="equipment-row-icon"
                              src={EditIcon}
                              alt="Ícone Editar Equipamento"
                            />
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            className="equipment-row-button"
                            onClick={() => {
                              setIsDeleting(equipamento);
                            }}
                          >
                            <img
                              className="equipment-row-icon"
                              src={DeleteIcon}
                              alt="Ícone Deletar Equipamento"
                            />
                          </button>
                        </td>
                        <td className="text-center">{equipamento.id}</td>
                        <td className="text-center">
                          {equipamento.nome_equipamento}
                        </td>
                        <td className="text-center">
                          {equipamento.marca_equipamento}
                        </td>
                        <td className="text-center">
                          {equipamento.tipo_equipamento}
                        </td>
                        <td className="text-center">
                          {equipamento.modelo_equipamento}
                        </td>
                        <td className="text-center">
                          {parseDate(equipamento.data_aquisicao)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">
                  Não existe nenhum equipamento cadastrado
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
  "",
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
  const day = data.getDate();
  const month = months[data.getMonth()];
  const year = data.getFullYear();

  return `${day} de ${month} de ${year}`;
};
