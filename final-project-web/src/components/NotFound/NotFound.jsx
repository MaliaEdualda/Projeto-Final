import notFound from "../../images/NotFoundImage.png";
import './styles.css';

export default function NotFound() {
    return (
        <div className='not-found-component'>
            <img src={notFound} alt="Imagem de página não encontrada."></img>
            <h1 className='subtitle'>Um erro ocorreu. Não encontramos esta página.</h1>
            <a href='/pagina-principal'>Voltar para a página principal</a>
        </div>
    )
}