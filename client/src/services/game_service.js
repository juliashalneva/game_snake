import Axios from "axios";

//адрес api
const UsersAPI = `http://localhost:5000`;

class GameService {
  move(direction, snake, apple, map, score) {
    return Axios.post(`${UsersAPI}/api/game/move`, {
      direction: direction,
      snake: snake,
      apple: apple,
      map: map,
      score: score,
    });
  }

  start(map) {
    return Axios.post(`${UsersAPI}/api/game/start`, {
      map: map,
    });
  }
}

export default new GameService();
