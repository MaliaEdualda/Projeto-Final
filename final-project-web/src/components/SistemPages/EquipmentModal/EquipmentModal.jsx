import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { InputComponent } from "../InputComponent/InputComponent";

export function EquipmentModal({
  data: editData,
  isOpen,
  closeFunction,
  addEquipment,
  editEquipment
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (editData) {
      setValue("nome_equipamento", editData.nome_equipamento);
      setValue("marca_equipamento", editData.marca_equipamento);
      setValue("tipo_equipamento", editData.tipo_equipamento);
      setValue("modelo_equipamento", editData.modelo_equipamento);
      setValue("data_aquisicao", editData.data_aquisicao);
      setValue("id", editData.id)  
      }
  }, [editData, setValue]);

  return (
    <Modal show={isOpen} onHide={() => closeFunction(false)}>
      <Modal.Header>
        <Modal.Title>{!!editData ? 'Editar' : 'Criar' } equipamento: </Modal.Title>
      </Modal.Header>
      <form
        className="formulario"
        noValidate
        validated={!errors}
        onSubmit={(e) => {
          e.preventDefault()
          if (editData) {
            handleSubmit(editEquipment)();
          } else {
            handleSubmit(addEquipment)();
          }
        }}
      >
        <h1 className="modal-body-title">
          Preencha o formulário para {!!editData ? 'editar' : 'criar' } um equipamento:{" "}
        </h1>
        <Modal.Body>
          <InputComponent
            name={"nome_equipamento"}
            register={register}
            errors={errors}
            constraints={{
              required: {
                value: true,
                message: "O nome do equipamento é obrigatório.",
              },
            }}
            label="Nome do equipamento:"
          />
          <InputComponent
            name={"marca_equipamento"}
            register={register}
            errors={errors}
            constraints={{
              required: {
                value: true,
                message: "A marca do equipamento é obrigatória.",
              },
            }}
            label="Marca do equipamento:"
          />
          <InputComponent
            name={"tipo_equipamento"}
            register={register}
            errors={errors}
            constraints={{
              required: {
                value: true,
                message: "O tipo do equipamento é obrigatório.",
              },
            }}
            label="Tipo do equipamento:"
          />
          <InputComponent
            name={"modelo_equipamento"}
            register={register}
            errors={errors}
            constraints={{
              required: {
                value: true,
                message: "O modelo do equipamento é obrigatório.",
              },
            }}
            label="Modelo do equipamento:"
          />
          <InputComponent
            name={"data_aquisicao"}
            type="date"
            register={register}
            errors={errors}
            constraints={{
              required: {
                value: true,
                message: "A data de aquisição é obrigatória.",
              },
            }}
            label="Data de aquisição:"
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="submit-modal-button"
            type="submit"
            disabled={!isValid}>
            {!!editData ? 'Editar' : 'Criar'}  equipamento
          </button>
          <button
            className="close-modal-button"
            onClick={() => closeFunction(false)}
          >
            Fechar
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
