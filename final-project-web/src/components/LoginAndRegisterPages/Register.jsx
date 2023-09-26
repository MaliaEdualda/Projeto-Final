import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextInput } from './TextInput';
import { registerUser } from '../../services/user-service';
import Logo from '../../images/logo.png';
import "./styles.css";

export default function Login() {
    const [error, setError] = useState();
    const { handleSubmit, register, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            navigate('/pagina-principal');
            window.location.reload(true);
        } catch (error) {
            setError({ message: error.response.data.error });
        }
    }

    return (
        <div className='register-main-page'>
            <div className='login-info-component'>
                <div className='login-info-content'>
                    <div className='logo-content'>
                        <img className='logo-image-register' src={Logo} alt="Logo do sistema" />
                        <div className='logo-text'>
                            <h1 className='logo-title'>SIGED MT</h1>
                            <h2 className='logo-subtitle'>Sistema Integrado de Gestão de Equipamentos Didáticos</h2>
                        </div>
                    </div>

                    <div className='login-page-text-content'>
                        <h1 className='login-page-text-title'>Bem vindo(a)!</h1>
                        <h2 className='login-page-text-subtitle'>Faça seu cadastro para acessar o nosso sistema.</h2>
                    </div>
                </div>

            </div>
            <form className='form' noValidate validated={!errors} onSubmit={handleSubmit(onSubmit)}>
                {error && <p className='form-error-message'>{error.message}</p>}
                <TextInput
                    name={'nome_completo'}
                    register={register}
                    errors={errors}
                    constraints={{
                        required: { value: true, message: 'O nome completo é obrigatório.' },
                    }}
                    label="Nome completo:" />

                <TextInput
                    name={'email'}
                    register={register}
                    errors={errors}
                    constraints={{
                        required: { value: true, message: 'O email é obrigatório.' },
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.+[A-Z]{2,}$/i, message: 'Email inválido.', }
                    }}
                    label="Email:" />

                <div className='register-form-camp'>
                    <TextInput
                        name={'data_nascimento'}
                        register={register}
                        errors={errors}
                        constraints={{
                            required: { value: true, message: 'A data de nascimento é obrigatória.' }
                        }}
                        label="Data de nascimento:"
                        type={"date"} />

                    <TextInput
                        name={'cep'}
                        register={register}
                        errors={errors}
                        constraints={{
                            required: { value: true, message: 'O CEP é obrigatório.' },
                            pattern: { value: /^[0-9]+$/i, message: 'Apenas números são válidos.' },
                            maxLength: { value: 8, message: 'O CEP deve conter no máximo 8 números.'}
                        }}
                        label="CEP:" />
                </div>

                <div className='register-form-camp'>
                    <TextInput
                        name={'telefone'}
                        register={register}
                        errors={errors}
                        constraints={{}}
                        label="Telefone (opcional):" />

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
                </div>

                <div className='button-component'>
                    <button type='submit' className='login-button' disabled={!isValid}>Cadastrar</button>
                    <Link to='/'>
                        <button className='link-to-register-button'>Já possui conta? Faça login.</button                  >
                    </Link>
                </div>
            </form>
        </div>
    )
}