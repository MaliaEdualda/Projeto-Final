import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { InputComponent } from "../InputComponent/InputComponent";

export function ReservationModal({
  data: editData,
  isOpen,
  closeFunction,
  addReservation,
  editReservation,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (editData) {
      setValue("equipamentoDidaticoId", editData.equipamentoDidaticoId);
      setValue("usuarioId", editData.usuarioId);
      setValue("data_reserva", editData.data_reserva);
      setValue("razao_reserva", editData.razao_reserva);
      setValue("previsao_devolucao", editData.previsao_devolucao);
      setValue("id", editData.id);
    }
  }, [editData, setValue]);

  return (
    <Modal show={isOpen} onHide={() => closeFunction(false)}>
      <Modal.Header>
        <h1 className="modal-header-content">
          {!!editData ? "Editar" : "Solicitar"} uma reserva:{" "}
        </h1>
      </Modal.Header>
      <form
        className="modal-content-formulario"
        noValidate
        validated={!errors}
        onSubmit={(e) => {
          e.preventDefault();
          if (editData) {
            handleSubmit(editReservation)();
          } else {
            handleSubmit(addReservation)();
          }
        }}
      >
        <Modal.Body>
          <h1 className="modal-body-title">
            Preencha o formulário para {!!editData ? "editar" : "solicitar"} uma
            reserva:{" "}
          </h1>
          <InputComponent
            name={"data_reserva"}
            register={register}
            errors={errors}
            constraints={{
              required: {
                value: true,
                message: "A data da reserva é obrigatória.",
              },
            }}
            label="Data da reserva:"
            type={"date"}
          />
          <InputComponent
            name={"razao_reserva"}
            register={register}
            errors={errors}
            constraints={{
              required: {
                value: true,
                message: "A razão da reserva é obrigatória.",
              },
            }}
            label="Razão reserva:"
          />
          <InputComponent
            name={"previsao_devolucao"}
            register={register}
            errors={errors}
            constraints={{
              required: {
                value: true,
                message: "A data de previsão da devolução é obrigatória.",
              },
            }}
            label="Previsão de devolução:"
            type={"date"}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="submit-modal-button"
            type="submit"
            disabled={!isValid}
          >
            {!!editData ? "Editar" : "Solicitar"} reserva
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
