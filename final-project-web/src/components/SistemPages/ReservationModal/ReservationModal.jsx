import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import { getEquipments } from "../../../services/equipment-service";
import { Modal } from "react-bootstrap";
import { InputComponent } from "../InputComponent/InputComponent";

export function ReservationModal({
  data: editData,
  isOpen,
  closeFunction,
  addReservation,
  editReservation,
}) {
  const [equipamentos, setEquipamentos] = useState([]);
  const isLoading = equipamentos?.length > 0;

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const setEquipments = async () => {
      try {
        const { data } = await getEquipments();
        const options = data.map((equipamento, index) => {
          const options = {
            name: equipamento.nome_equipamento,
            value: equipamento.id,
          };
          return options;
        });

        return options;
      } catch (error) {
        console.log(error);
      }
    };

    setEquipments()
      .then((result) => {
        setEquipamentos(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          {!!editData
            ? `Editar reserva de ${editData.EquipamentoDidatico.nome_equipamento}`
            : "Solicitar uma reserva:"}
        </h1>
      </Modal.Header>

      {isLoading && (
        <>
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
                Preencha o formulário para {!!editData ? "editar" : "solicitar"}{" "}
                uma reserva:{" "}
              </h1>

              <div className="input-component">
                <SelectSearch
                  fuzzySearch
                  renderValue={(valueProps) => (
                    <div className="input-component">
                      <label>{"Nome do equipamento"}</label>
                      <input {...valueProps} />
                    </div>
                  )}
                  register={register}
                  name={"equipamentoDidaticoId"}
                  options={equipamentos}
                  search={true}
                  defaultValue={
                    equipamentos.find(
                      (x) => x.value === getValues("equipamentoDidaticoId")
                    )?.value ?? ""
                  }
                  placeholder="Selecione o equipamento: "
                  onChange={(value) => {
                    setValue("equipamentoDidaticoId", value);
                  }}
                />
              </div>
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
                label="Razão da reserva:"
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
        </>
      )}
    </Modal>
  );
}
