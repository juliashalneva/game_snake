const { Router } = require("express");
const router = Router();

// /api/game_logic/move
router.post("/move", async (request, response) => {
  try {
    const { snake, direction, apple, map, score } = request.body;

    let newApple = apple;
    let newSnake = snake;
    let newScore = score;
    //console.log(snake, apple, map, direction);
    let newSnakeX = snake[0].x + direction.x;
    let newSnakeY = snake[0].y + direction.y;

    //snake
    if (newSnakeX > map.width - 1) {
      newSnakeX = 0;
    }
    if (newSnakeX < 0) {
      newSnakeX = map.width - 1;
    }
    if (newSnakeY > map.height - 1) {
      newSnakeY = 0;
    }
    if (newSnakeY < 0) {
      newSnakeY = map.height - 1;
    }

    //apple
    if (apple.x > map.width) {
      newApple.x = map.width - 1;
    }
    if (apple.x < 0) {
      newApple.x = 0;
    }
    if (apple.y > map.height) {
      newApple.y = map.height - 1;
    }
    if (apple.y < 0) {
      newApple.y = 0;
    }

    let newSnakeHead = {
      x: newSnakeX,
      y: newSnakeY,
    };

    if (!(newSnakeX == apple.x && newSnakeY == apple.y)) {
      newSnake.pop();
    } else {
      console.log("съел");
      newScore += 100;
      newApple = getNewApple(map.width, map.height);
    }

    for (let i = 1; i < snake.length; i++) {
      if (newSnakeX == snake[i].x && newSnakeY == snake[i].y) {
        newSnake.splice(i, snake.length);
        newScore = 0;
        console.log("столкнулся");
        break;
      }
    }

    newSnake.unshift(newSnakeHead);

    return response.json({
      snake: newSnake,
      apple: newApple,
      score: newScore,
    });
  } catch (e) {
    return response.status(500).json({
      message: "Error: " + e.message,
    });
  }
});

// /api/game_logic/start
router.post("/start", async (req, res) => {
  try {
    const { map } = req.body;

    newApple = getNewApple(map.width, map.height);
    newSnake = getNewSnake();

    return res.json({
      direction: { x: 1, y: 0 },
      apple: newApple,
      snake: newSnake,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Error: " + e.message,
    });
  }
});

function rand(min, max) {
  k = Math.floor(Math.random() * (max - min) + min);
  return k;
}

//Функция для создания нового яблока
function getNewApple(mapWidth, mapHeight) {
  const apple = { x: rand(0, mapWidth), y: rand(0, mapHeight) };
  return apple;
}

//Функция для создания тела змейки из одного элемента.
function getNewSnake() {
  const snake = [{ x: 0, y: 0 }];
  return snake;
}

module.exports = router;
