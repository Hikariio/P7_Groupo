import http from "../http-common";
class TutorialDataService {
  getAll() {
    return http.get("/BoardTutorial");
  }
  get(id) {
    return http.get(`/BoardTutorial/${id}`);
  }
  create(data) {
    return http.post("/BoardTutorial", data);
  }
  update(id, data) {
    return http.put(`/BoardTutorial/${id}`, data);
  }
  delete(id) {
    return http.delete(`/BoardTutorial/${id}`);
  }
  deleteAll() {
    return http.delete(`/BoardTutorial`);
  }
  findByTitle(title) {
    return http.get(`/BoardTutorial?title=${title}`);
  }
}
export default new TutorialDataService();