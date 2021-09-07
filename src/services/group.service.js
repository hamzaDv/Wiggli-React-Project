import http from "../http-common";

class GroupDataService {
  getAll() {
    return http.get("/groups");
  }

  get(id) {
    return http.get(`/groups/${id}`);
  }

  create(data, token) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
    const body = JSON.stringify(data);


    return http.post("/groups", body, {headers});
  }

  update(id, data, token) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
    const body = JSON.stringify(data);

    return http.put(`/groups/${id}`, body, {headers});
  }

  delete(id, token) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
    return http.delete(`/groups/${id}`, {headers});
  }

  deleteAll() {
    return http.delete(`/groups`);
  }



}

export default new GroupDataService();
