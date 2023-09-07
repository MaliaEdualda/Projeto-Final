import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/LoginAndRegisterPages/Register';
import Login from './components/LoginAndRegisterPages/Login';
import MainPage from './components/SistemPages/MainPage';
import EquipmentPage from './components/SistemPages/EquipmentPage';
import LoaningAndDevolutionPage from './components/SistemPages/LoaningAndDevolutionPage';
import EditProfilePage from './components/SistemPages/EditProfilePage';
import HelpAndSupportPage from './components/SistemPages/HelpAndSupportPage';

export function Navigations() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Register />} />
        <Route path='/pagina-principal' element={<MainPage />} />
        <Route path='/equipamentos' element={<EquipmentPage />} />
        <Route path='/emprestimo-e-devolucao' element={<LoaningAndDevolutionPage />} />
        <Route path='/editar-perfil' element={<EditProfilePage />} />
        <Route path='/ajuda-e-suporte' element={<HelpAndSupportPage/>} />
      </Routes>
    </BrowserRouter >
  );
}

export default Navigations;