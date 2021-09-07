import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data, token) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
    return http.post("/users", data, {headers});
  }

  update(id, data, token) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
    return http.put(`/users/${id}`, data, {headers});
  }

  delete(id, token) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
    return http.delete(`/users/${id}`, {headers});
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  attach(userId, groupId, token) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};

    return http.get(`/attach/${userId}/${groupId}`, {headers});
  }

}

export default new UserDataService();
