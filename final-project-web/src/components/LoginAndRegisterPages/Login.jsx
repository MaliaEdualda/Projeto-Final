import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
import { TextInput } from './TextInput'
import { loginUser } from '../../services/user-service'
import Logo from '../../images/logo.png'
import './styles.css';

export default function Login() {
    const [connectionError, setConnectionError] = useState(null);
    const [error, setError] = useState();
    const { handleSubmit, register, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await loginUser(data);
            navigate('/pagina-principal');
            window.location.reload(true);
        } catch (error) {
            console.log(error);
            if (error.response.data.status === "500") setConnectionError({message: error.response.data.error})
            setError({message: error.response.data.error})
        }
    }

    return (
        <div className='login-main-page'>
            <div className='login-info-component'>
                <div className='login-info-content'>
                    <div className='logo-content'>
                        <img className='logo-image-login' src={Logo} alt="Logo do sistema" />
                        <div className='logo-text'>
                            <h1 className='logo-title'>SIGED MT</h1>
                            <h2 className='logo-subtitle'>Sistema Integrado de Gestão de Equipamentos Didáticos</h2>
                        </div>
                    </div>

                    <div className='login-page-text-content'>
                        <h1 className='login-page-text-title'>Bem vindo(a) de volta!</h1>
                        <h2 className='login-page-text-subtitle'>Faça login para acessar o nosso sistema.</h2>
                    </div>
                </div>
            </div>

            {/*MODAL DE ERRO DE CONEXÃO*/}
            <Modal
              show={!!connectionError}
              onHide={() => {
                setConnectionError(null);
              }}
            >
              <Modal.Body>
                <h1 className="error-modal-content-text">{connectionError?.message}</h1>
              </Modal.Body>
              <Modal.Footer>
                <button className='submit-modal-button' onClick={() => {setConnectionError(null)}}>
                  OK.
                </button>
                </Modal.Footer>
            </Modal>

            <form className='form' noValidate validated={!errors} onSubmit={handleSubmit(onSubmit)}>
                {error && <p className='form-error-message'>{error.message}</p>}
                <TextInput
                    name={'email'}
                    register={register}
                    errors={errors}
                    constraints={{
                        required: { value: true, message: 'O email é obrigatório.' },
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.+[A-Z]{2,}$/i, message: 'Email inválido.', }
                    }}
                    label="Email:" />
                <TextInput
                    name={'senha'}
                    register={register}
                    constraints={{
                        required: { value: true, message: 'A senha é obrigatória.' },
                        minLength: { value: 8, message: 'A senha deve conter no mínimo 8 caracteres.' }
                    }}
                    errors={errors}
                    label="Senha:"
                    type={"password"} />
                <div className='button-component'>
                    <button type='submit' className='login-button' disabled={!isValid}>Entrar</button>
                    <Link to='/cadastro'>
                        <button className='link-to-register-button'>Não possui conta? Cadastre-se.</button                  >
                    </Link>
                </div>
            </form>
        </div>

    )
}
