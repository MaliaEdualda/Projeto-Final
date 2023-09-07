import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextInput } from './TextInput'
import Logo from '../../images/logo.png'
import "./styles.css"

export default function Login() {
    const { handleSubmit, register, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

    const navigate = useNavigate();

    const onSubmit = () => {
        navigate('/pagina-principal');
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
                <TextInput
                    name={'nomeCompleto'}
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
                
                <TextInput
                    name={'dataNascimento'}
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
                        pattern: { value: /^[0-9]+$/i, message: 'Apenas números são válidos.'}
                    }}
                    label="CEP:" />
                
                <TextInput
                    name={'numeroTelefone'}
                    register={register}
                    errors={errors}
                    constraints={{
                        pattern: { value: /^[0-9]+$/i, message: 'Insira apenas números.'}
                    }}
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
                
                <div className='button-component'>
                    <button className='login-button' disabled={!isValid}>Cadastrar</button>
                    <Link to='/login'>
                        <button className='link-to-register-button'>Já possui conta? Faça login.</button                  >
                    </Link>
                </div>
            </form>
        </div>
    )
}