import { Link } from 'react-router-dom';
import DashboardIcon from '../../images/icons/DashboardIcon.png';
import MicroscopeIcon from '../../images/icons/MicroscopeIcon.png';
import AgendaIcon from '../../images/icons/AgendaIcon.png';
import EditProfileIcon from '../../images/icons/EditProfileIcon.png';
import UserSupportIcon from '../../images/icons/UserSupportIcon.png';
import LogoutIcon from '../../images/icons/LogoutIcon.png';
import './styles.css';

export function LeftMenu() {
    return (
        <div className='left-menu-component'>
            <Link to='/pagina-principal' style={{ 'text-decoration': 'none' }}>
                <button className='link-to-component'>
                    <img className='navigation-icon' src={DashboardIcon} alt='Ícone de dashboard' />
                    <h1>Página Principal</h1>
                </button>
            </Link>

            <Link to='/equipamentos' style={{ 'text-decoration': 'none' }}>
                <button className='link-to-component'>
                    <img className='navigation-icon' src={MicroscopeIcon} alt='Ícone de equipamentos' />
                    <h1>Equipamentos</h1>
                </button>
            </Link>

            <Link to='/emprestimo-e-devolucao' style={{ 'text-decoration': 'none' }}>
                <button className='link-to-component'>
                    <img className='navigation-icon' src={AgendaIcon} alt='Ícone de agenda' />
                    <h1>Empréstimos e devoluções</h1>
                </button>
            </Link>

            <Link to='/editar-perfil' style={{ 'text-decoration': 'none' }}>
                <button className='link-to-component'>
                    <img className='navigation-icon' src={EditProfileIcon} alt='Ícone de editar perfil' />
                    <h1>Editar perfil</h1>
                </button>
            </Link>

            <Link to='/ajuda-e-suporte' style={{ 'text-decoration': 'none' }}>
                <button className='link-to-component'>
                    <img className='navigation-icon' src={UserSupportIcon} alt='Ícone de suporte ao usuário' />
                    <h1>Ajuda e suporte</h1>
                </button>
            </Link>


            <button className='logout-component'>
                <img className='logout-icon' src={LogoutIcon} alt='Ícone de logout' />
                <h1>Logout</h1>
            </button>
        </div>
    )
}