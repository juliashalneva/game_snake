import Axios from "axios";

//адрес api
const UsersAPI = `http://localhost:5000`;

class RecordService {
  get() {
    return Axios.get(`${UsersAPI}/api/record/get`);
  }

  create(username, score) {
    return Axios.post(
      `${UsersAPI}/api/record/create`,
      {
        username: username,
        score: score,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  }
}

export default new RecordService();
