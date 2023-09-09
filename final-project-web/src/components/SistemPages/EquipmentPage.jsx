import { LeftMenu } from './LeftMenu';
import Logo from '../../images/logo.png';
import './styles.css';

export default function EquipmentPage() {
    return (
        <div className='full-page'>
            <div className='top-bar'>
                <div className='logo-component'>
                    <img className='logo-image-main' src={Logo} alt="Logo do sistema" />
                    <div className='logo-text-component'>
                        <h1>SIGED MT</h1>
                    </div>
                </div>
            </div>
            <div className='main-page'>
                <LeftMenu className='left-menu' />
                <div className='dashboard-area'>
                    <h1>Equipamentos</h1>
                </div>
            </div>

        </div>
    )
}