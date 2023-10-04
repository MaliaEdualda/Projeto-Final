import { api } from './API';

export async function getUserReservations(userId) {
    const result = await api.get(`/reserva/${userId}`);
    return result
}

export async function getConcludedReservations() {
    const result = await api.get('/reserva/concluida');
    return result
}

export async function getUnfinishedReservations() {
    const result = await api.get('/reserva/em-andamento');
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