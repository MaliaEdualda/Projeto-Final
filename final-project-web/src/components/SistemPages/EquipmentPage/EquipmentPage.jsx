import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getEquipmentsFiltered,
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
import AddIcon from "../../../images/icons/AddIcon.png"
import "./styles.css";

export default function EquipmentPage() {
  const { handleSubmit, register, reset } = useForm();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentUpdating, setCurrentUpdating] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [equipamentos, setEquipamentos] = useState();

  const startEditing = (data) => {
    setCurrentUpdating(data);
    setModalOpen(true);
  };

  const setEquipments = async () => {
    try {
      const result = await getEquipmentsFiltered();
      setEquipamentos(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addFilter = async (data) => {
    try {
      const result = await getEquipmentsFiltered(data);
      setEquipamentos(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const addEquipment = async (data) => {
    try {
      await createEquipment(data);
      setModalOpen(false);
      await setEquipments();
    } catch (error) {
      console.log(error);
    }
  };

  const editEquipment = async (data) => {
    try {
      await updateEquipment(data);
      setModalOpen(false);
      setCurrentUpdating(null);
      await setEquipments();
    } catch (error) {
      console.log(error);
    }
  };

  const removeEquipment = async (id) => {
    try {
      await deleteEquipment(id);
      setIsDeleting(null);
      await setEquipments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setEquipments();
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
            <div className="action-area">
              <form className="filter-form" noValidate validate reset onSubmit={handleSubmit(addFilter)}>
                <h1>Filtrar por: </h1>
                <input className="filter-form-input" placeholder="Nome:"
                  type="text"
                  {...register("nome_equipamento")} />
                
                <input className="filter-form-input" placeholder="Marca:"
                  type="text"
                  {...register("marca_equipamento")} />
                
                <input className="filter-form-input" placeholder="Tipo:"
                  type="text"
                  {...register("tipo_equipamento")} />
                
                <input className="filter-form-input" placeholder="Modelo:"
                  type="text"
                  {...register("modelo_equipamento")} />
                
                <input className="filter-form-input" placeholder="Data de aquisição:"
                  type="date"
                  {...register("data_aquisicao")} />
                <button type='submit' className="filter-form-button">Filtrar</button>
                <button className="filter-form-clean-button" onClick={() => reset()}>Limpar</button>
              </form>
              <button
                className="create-equipment-button"
                onClick={() => setModalOpen(true)}
              >
                <img src={AddIcon} alt="Ícone de adicionar" />
                Criar Equipamento
              </button>
            </div>

            {/* MODAL DE ADIÇÃO E EDIÇÃO */}
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

            <div className="table-container">
              {equipamentos && equipamentos.length > 0 ? (
                <table className="table-content">
                  <thead className="table-head">
                    <tr>
                      <th className="table-head-content" scope="col">
                        NOME EQUIPAMENTO
                      </th>
                      <th className="table-head-content" scope="col">
                        MARCA EQUIPAMENTO
                      </th>
                      <th className="table-head-content" scope="col">
                        TIPO EQUIPAMENTO
                      </th>
                      <th className="table-head-content" scope="col">
                        MODELO EQUIPAMENTO
                      </th>
                      <th className="table-head-content" scope="col">
                        {" "}
                      </th>
                      <th className="table-head-content" scope="col">
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipamentos.map((equipamento, index) => (
                      <tr key={equipamento.id}>
                        <td className="table-row-content">
                          {equipamento.nome_equipamento}
                        </td>
                        <td className="table-row-content">
                          {equipamento.marca_equipamento}
                        </td>
                        <td className="table-row-content">
                          {equipamento.tipo_equipamento}
                        </td>
                        <td className="table-row-content">
                          {equipamento.modelo_equipamento}
                        </td>
                        <td className="table-row-content">
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
                        <td className="table-row-content">
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="non-data-text">
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

// const months = [
//   "",
//   "jan.",
//   "fev.",
//   "mar.",
//   "abr.",
//   "mai.",
//   "jun.",
//   "jul.",
//   "ago.",
//   "set.",
//   "out.",
//   "nov.",
//   "dez.",
// ];

// const parseDate = (date) => {
//   const data = new Date(date);
//   const day = data.getDate();
//   const month = months[data.getMonth()];
//   const year = data.getFullYear();

//   return `${day} de ${month} de ${year}`;
// };
