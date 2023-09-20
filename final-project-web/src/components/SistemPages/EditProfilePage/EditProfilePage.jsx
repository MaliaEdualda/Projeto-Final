import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getUserById,
  updateUser,
  deleteUser,
} from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { InputComponent } from "../InputComponent/InputComponent";
import { Modal } from "react-bootstrap";
import { LeftMenu } from "../LeftMenu/LeftMenu";
import Logo from "../../../images/logo.png";
import WarningIcon from "../../../images/icons/WarningIcon.png"
import "./styles.css";

export default function EditProfilePage() {
  const [isDeleting, setIsDeleting] = useState();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(true);

  const editUser = async (data) => {
    try {
      await updateUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletarUsuario = async () => {
    try {
      const id = getValues("id");
      await deleteUser(id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const token = sessionStorage.getItem("token");
      const parsedToken = jwt_decode(token);
      try {
        const userData = await getUserById(parsedToken.id);
        if (userData) {
          setValue("nome_completo", userData?.nome_completo);
          setValue("email", userData?.email);
          setValue("data_nascimento", userData?.data_nascimento);
          setValue("cep", userData?.cep);
          setValue("telefone", userData?.telefone);
          setValue("id", userData?.id);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [setValue]);

  return (
    <>
      <div className="full-page">
        <div className="top-bar">
          <div className="logo-component">
            <img
              className="logo-image-main"
              src={Logo}
              alt="Logo do sistema"
            />
            <div className="logo-text-component">
              <h1>SIGED MT</h1>
            </div>
          </div>
        </div>
        <div className="main-page">
          <LeftMenu className="left-menu" />
          {!loading &&
            <div className="edit-profile-page">
              <h1 className="edit-profile-title">Edite o seu perfil: </h1>
              <Modal
                show={!!isDeleting}
                onHide={() => {
                  setIsDeleting(null);
                }}
              >
                <Modal.Header>
                  <h1 className="delete-modal-title">
                    Excluir conta
                  </h1>
                </Modal.Header>
                <Modal.Body>
                  <div className="delete-account-modal-content-container">
                    <img
                      className="delete-account-modal-icon"
                      src={WarningIcon}
                      alt="Ícone de aviso"
                    />
                    <h1 className="delete-account-modal-content-text">
                      Atenção! Ao realizar esta ação, você não será mais capaz de
                      acessar as informações deste equipamento.
                    </h1>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="delete-account-button"
                    onClick={() => deletarUsuario()}
                  >
                    Excluir
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setIsDeleting(null)}
                  >
                    Não. Cancelar
                  </button>
                </Modal.Footer>
              </Modal>
              <form
                className="formulario-editar-perfil"
                noValidate
                validated={!errors}
                onSubmit={handleSubmit(editUser)}
              >
                <InputComponent
                  name={"nome_completo"}
                  register={register}
                  errors
                  label={"Nome Completo:"}
                />
                <InputComponent
                  name={"email"}
                  register={register}
                  errors
                  label={"Email:"}
                />
                <InputComponent
                  name={"data_nascimento"}
                  register={register}
                  errors
                  type="date"
                  label={"Data de Nascimento"}
                />
                <InputComponent
                  name={"cep"}
                  register={register}
                  errors
                  label={"CEP:"}
                />
                <InputComponent
                  name={"telefone"}
                  register={register}
                  errors
                  label={"Telefone"}
                />
                <div className="button-container">
                  <button className="edit-button" type="submit">
                    Editar dados
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => setIsDeleting(true)}
                  >
                    Excluir conta
                  </button>
                </div>
              </form>
            </div>
          }
        </div>
      </div>
    </>
  );
}
