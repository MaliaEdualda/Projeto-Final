import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getUserById } from "../../../services/user-service";
import { LeftMenu } from "../LeftMenu/LeftMenu";
import Logo from "../../../images/logo.png";
import "./styles.css";

export default function HelpAndSupportPage() {
  const { handleSubmit, register, reset } = useForm();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const user = jwt_decode(token);
      const result = await getUserById(user.id);
      setUser(result);
    } catch (error) {
      console.log(error.message);
      if (error.response.data.status === "500")
        setError({ message: error.response.data.error });
      setError(error.message);
    }
  };

  useEffect(() => {
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
        <div className="help-and-support-page">
          <div className="help-and-support-page-title">
            <h1>
              {`Olá, ${user?.nome_completo
                ?.split(" ")
                .shift()}. Envie-nos a sua dúvida.`}
            </h1>
          </div>
          <form className="help-and-support-form">
            <div className="help-input-container">
              <label>Dê um título ao problema: </label>
              <input type="text"/>
            </div>

            <div className="help-input-container" style={{height: "50%"}}>
              <label>Descreva o seu problema: </label>
              <input type="text"/>
                      </div>
                      
            {/* <button className=""></button> */}
          </form>
        </div>
      </div>
    </div>
  );
}
