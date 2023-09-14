import shrek404 from "../../images/NotFoundImage.jpg";
import './styles.css';

export default function NotFound() {
    return (
        <div className='not-found-component'>
            <img src={shrek404} alt='Imagem ilustrativa de página não encontrada'></img>
            <h1 className='text-center'>Erro 404 - Página não encontrada.</h1>
            <a href='/pagina-principal'>Voltar para a página principal</a>
        </div>
    )
}