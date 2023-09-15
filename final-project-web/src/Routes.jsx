import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/LoginAndRegisterPages/Register';
import Login from './components/LoginAndRegisterPages/Login';
import MainPage from './components/SistemPages/MainPage';
import EquipmentPage from './components/SistemPages/EquipmentPage/EquipmentPage';
import LoaningAndDevolutionPage from './components/SistemPages/LoaningAndDevolutionPage';
import EditProfilePage from './components/SistemPages/EditProfilePage';
import HelpAndSupportPage from './components/SistemPages/HelpAndSupportPage';
import NotFound from './components/NotFound/NotFound';
import NotFoundAuthenticated from './components/NotFound/NotFoundAuthenticated'

import { isAuthenticated } from './services/is-authenticated';


export function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    
    return <Navigate to="/" replace />
  }
  return children;
}

export function Navigations() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Login />} />
        <Route path='/cadastro' element={<Register />} />
        <Route path='/pagina-principal' element={<PrivateRoute>
          <MainPage />
        </PrivateRoute>} />
        <Route path='/equipamentos' element={<PrivateRoute>
          <EquipmentPage />
        </PrivateRoute>} />
        <Route path='/emprestimo-e-devolucao' element={<PrivateRoute>
          <LoaningAndDevolutionPage />
        </PrivateRoute>} />
        <Route path='/editar-perfil' element={<PrivateRoute>
          <EditProfilePage />
        </PrivateRoute>} />
        <Route path='/ajuda-e-suporte' element={<PrivateRoute>
          <HelpAndSupportPage />
        </PrivateRoute>} />
        <Route path='/*' element={<PrivateRoute>
          <NotFoundAuthenticated />
        </PrivateRoute>} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter >
  );
}

export default Navigations;