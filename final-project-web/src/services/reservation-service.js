import { api } from './API';

export async function getUserReservations(userId) {
    const result = await api.get(`/reserva/${userId}`);
    return result
}

export async function getConcludedReservations(data) {
    const result = await api.post('/reserva/concluida', data);
    return result
}

export async function getUnfinishedReservations(data) {
    const result = await api.post('/reserva/em-andamento', data);
    return result
}

export async function countReservations() {
    const result = await api.get('/reserva/contar');
    return result
}

export async function countReservationsByPeriod() {
    const result = await api.get('/reserva/contar-por-periodo');
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