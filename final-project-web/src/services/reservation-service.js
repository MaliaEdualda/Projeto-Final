import { api } from './API';

export async function getReservations() {
    const result = await api.get('/reserva');
    return result
}

export async function createReservation(data) {
    const result = api.post('/reserva', data);
    return result
}

export async function updateReservation(data) {
    const result = api.put(`/reserva/${data.id}`, data);
    return result
}

export async function deleteReservation(id) {
    const result = api.delete(`/reserva/${id}`);
    return result
}