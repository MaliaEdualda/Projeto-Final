import { api } from './API';

export async function getEquipments() {
    const result = await api.get('/equipamento',);
    return result
}

export async function getEquipmentsFiltered(data) {
    const result = api.post('/equipamento/filtro', data);
    return result
}

export async function createEquipment(data) {
    const result = api.post('/equipamento', data);
    return result
}

export async function updateEquipment(data) {
    const result = api.put(`/equipamento/${data.id}`, data);
    return result
}

export async function deleteEquipment(id) {
    const result = api.delete(`/equipamento/${id}`);
    return result
}