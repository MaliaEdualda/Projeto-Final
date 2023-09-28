import { api } from "./API";

export async function loginUser(data) {
  const result = await api.post("/usuario/signin", data);
  sessionStorage.setItem("token", JSON.stringify(result.data.result));
}

export async function registerUser(data) {
  await api.post("/usuario/signup", data);
}

export async function getUsers() {
  const users = await api.get("/usuario");
  return users;
}

export async function getUserById(idUser) {
  const { data } = await api.get(`/usuario/${idUser}`);
  return data;
}

export async function updateUser(data) {
  const result = api.put(`/usuario/${data.id}`, data);
  return result;
}

export async function deleteUser(id) {
  const result = api.delete(`usuario/${id}`);
  sessionStorage.removeItem('token');
  return result;
}
