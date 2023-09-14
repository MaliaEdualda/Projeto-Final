import { api } from './API';

export async function getEquipments() {
    const result = await api.get('/equipamento',);
    return result
}

export async function getEquipmentsFiltered(data) {
    const result = api.post('/equipamento/filtro', data);
    return result
}