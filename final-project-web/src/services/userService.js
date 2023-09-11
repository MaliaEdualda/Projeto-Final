import api from './API';

export async function loginUser(data) {
    const result = await api.post('/signin', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accesToken));
}

export async function registerUser(data) {
    const result = await api.post('/signup', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accesToken));
}

export async function getUsers() {
    const users = await api.get('/usuario');
    return users
}

export async function getUserById(idUser) {
    const user = await api.get(`/usuario/${idUser}`)
    return user
}