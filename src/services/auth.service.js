import http from "../http-common";

class AuthDataService {

  login(data) {
    return http.post("/auth/login", data);
  }

  register(data) {
    return http.post("/auth/register", data);
  }

  IfloggedIn() {
    return http.get("/auth/logged");
  }

}

export default new AuthDataService();
