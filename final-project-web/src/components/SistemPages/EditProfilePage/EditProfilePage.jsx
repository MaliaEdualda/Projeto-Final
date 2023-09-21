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
  const [editsuccess, setEditSuccess] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const [loading, setLoading] = useState(true);

  const editUser = async (data) => {
    try {
      await updateUser(data);
      setEditSuccess(true);
    } catch (error) {
      setError({ message: error.response.data.message })
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
          setValue("senha", userData?.senha);
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
              <h1 className="edit-profile-title">Edite o seu perfil: {error && <p className='edit-profile-error-message'>{error.message}</p>}</h1>
              <Modal
                show={editsuccess}
                onHide={() => {
                  setEditSuccess(false)
                }}
              >
                <Modal.Header>
                  <h1 className="modal-title">Sucesso!</h1>
                </Modal.Header>
                <Modal.Body>
                  <h1 className="modal-content-text">Dados atualizados com sucesso.</h1>
                </Modal.Body>
                <Modal.Footer>
                  <button className="close-modal-button" onClick={() => setEditSuccess(false)}>
                    OK
                  </button>
                </Modal.Footer>
              </Modal>
              
              <Modal
                show={!!isDeleting}
                onHide={() => {
                  setIsDeleting(null);
                }}
              >
                <Modal.Header>
                  <h1 className="modal-title">
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
                    className="cancel-modal-button"
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
                  constraints={{
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.+[A-Z]{2,}$/i, message: 'Email inválido.', }
                  }}
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
                  constraints={{
                    pattern: { value: /^[0-9]+$/i, message: 'Apenas números são válidos.' },
                    maxLength: { value: 8, message: 'O CEP deve conter no máximo 8 números.' }
                  }}
                  errors
                  label={"CEP:"}
                />
                <InputComponent
                  name={"telefone"}
                  register={register}
                  errors
                  label={"Telefone"}
                />
                <InputComponent
                  name={"senha"}
                  register={register}
                  constraints={{
                    minLength: { value: 8, message: 'A senha deve conter no mínimo 8 caracteres.' }
                  }}
                  errors
                  label={"Alterar senha: "}
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
