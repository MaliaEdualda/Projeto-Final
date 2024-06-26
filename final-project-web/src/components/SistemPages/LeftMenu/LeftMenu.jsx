import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '../../../images/icons/DashboardIcon.png';
import MicroscopeIcon from '../../../images/icons/MicroscopeIcon.png';
import AgendaIcon from '../../../images/icons/AgendaIcon.png';
import EditProfileIcon from '../../../images/icons/EditProfileIcon.png';
import UserSupportIcon from '../../../images/icons/UserSupportIcon.png';
import LogoutIcon from '../../../images/icons/LogoutIcon.png';

export function LeftMenu() {
    
    const navigate = useNavigate();

    return (
        <div className='left-menu-component'>
            <Link to='/pagina-principal' style={{ textDecoration: 'none' }}>
                <button className='link-to-component'>
                    <img className='navigation-icon' src={DashboardIcon} alt='Ícone de dashboard' />
                    <h1>Página Principal</h1>
                </button>
            </Link>

            <Link to='/equipamentos' style={{ textDecoration: 'none' }}>
                <button className='link-to-component'>
                    <img className='navigation-icon' src={MicroscopeIcon} alt='Ícone de equipamentos' />
                    <h1>Equipamentos</h1>
                </button>
            </Link>

            <Link to='/reservas' style={{ textDecoration: 'none' }}>
                <button className='link-to-component'>
                    <img className='navigation-icon' src={AgendaIcon} alt='Ícone de agenda' />
                    <h1>Reservas</h1>
                </button>
            </Link>

            <Link to='/editar-perfil' style={{ textDecoration: 'none' }}>
                <button className='link-to-component'>
                    <img className='navigation-icon' src={EditProfileIcon} alt='Ícone de editar perfil' />
                    <h1>Editar perfil</h1>
                </button>
            </Link>

            <Link to='/ajuda-e-suporte' style={{ textDecoration: 'none' }}>
                <button className='link-to-component'>
                    <img className='navigation-icon' src={UserSupportIcon} alt='Ícone de suporte ao usuário' />
                    <h1>Ajuda e suporte</h1>
                </button>
            </Link>


            <button className='logout-component' onClick={() => {
                sessionStorage.removeItem('token');
                navigate('/');
            }}>
                <img className='logout-icon' src={LogoutIcon} alt='Ícone de logout' />
                <h1>Logout</h1>
            </button>
        </div>
    )
}