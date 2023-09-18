import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getUserById,
  updateUser,
  deleteUser,
} from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { LeftMenu } from "../LeftMenu/LeftMenu";
import Logo from "../../../images/logo.png";
import "./styles.css";
import { InputComponent } from "../InputComponent/InputComponent";

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
      {!loading && (
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
            <div className="edit-profile-page">
              <Modal
                show={!!isDeleting}
                onHide={() => {
                  setIsDeleting(null);
                }}
              >
                <Modal.Header>
                  <Modal.Title>
                    Deletar {isDeleting?.nome_equipamento}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h1>Tem certeza que deseja excluir a sua conta?</h1>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="delete-button"
                    onClick={() => deletarUsuario()}
                  >
                    Sim. Quero excluir a minha conta
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
                className="formulario"
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
          </div>
        </div>
      )}
    </>
  );
}
