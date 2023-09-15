import { useState, useEffect } from 'react';
import { getEquipments } from '../../../services/equipmentService';
import { LeftMenu } from '../LeftMenu/LeftMenu';
import Logo from '../../../images/logo.png';
import EditIcon from '../../../images/icons/EditIcon.png';
import DeleteIcon from '../../../images/icons/DeleteIcon.png';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EquipmentPage() {
    // const months = ["", "jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];

    // const parseDate = (date) => {
    //     const day = String(date).getDate();
    //     const month = months[String(date).getMonth()];
    //     const year = String(date).getYear();
    //     return `${day} de ${month} de ${year}`
    // }

    const [equipamentos, setEquipamentos] = useState();

    const getEquipamentos = async () => {
        try {
            const result = await getEquipments();
            setEquipamentos(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEquipamentos();
    }, []);

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
                <div className='equipment-page-area'>
                    <div className='equipment-area'>
                        {equipamentos && equipamentos.length > 0 ?
                            <table className="table table-striped">
                                <thead className="thead-light">
                                    <tr>
                                        <th className='text-center' scope="col">        </th>
                                        <th className='text-center' scope="col">        </th>
                                        <th className='text-center' scope="col">CÓDIGO</th>
                                        <th className='text-center' scope="col">NOME EQUIPAMENTO</th>
                                        <th className='text-center' scope="col">MARCA EQUIPAMENTO</th>
                                        <th className='text-center' scope="col">TIPO EQUIPAMENTO</th>
                                        <th className='text-center' scope="col">MODELO EQUIPAMENTO</th>
                                        <th className='text-center' scope="col">DATA AQUISIÇÃO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipamentos.map((equipamento, index) => (
                                        <tr key={equipamento.id}>
                                            <td className='text-center'><button><img className='equipment-row-icon' src={EditIcon} alt='Ícone Editar Equipamento'/></button></td>
                                            <td className='text-center'><button><img className='equipment-row-icon' src={DeleteIcon} alt='Ícone Deletar Equipamento'/></button></td>
                                            <td className="text-center"> {equipamento.id} </td>
                                            <td className="text-center"> {equipamento.nome_equipamento}</td>
                                            <td className="text-center"> {equipamento.marca_equipamento}</td>
                                            <td className="text-center"> {equipamento.tipo_equipamento}</td>
                                            <td className="text-center"> {equipamento.modelo_equipamento}</td>
                                            <td className="text-center"> {equipamento.data_aquisicao}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table> : <p className='text-center'>Não existe nenhum equipamento cadastrado</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}