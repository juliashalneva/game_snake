# game_snake
Проект по предмету Проектный практикум

## API

**base_url**: http://localhost:5000

* /api/record/get: [GET] получение списка 

* /api/record/create     - [POST] создание новой записи 
	* body-параметры: username - никнейм игрока;
		score    - набранные очки;		
    
* /api/game_logic/move  - [POST] обработка движения змейки по карте. 
	* body-параметры: snake - массив координат тела змейки
			direction - координаты направления змейки;
			apple - координаты яблока;
			map   - ширина и высота карты;
      score    - набранные очки;
      
* /api/game_logic/start - [POST] обработка запуска игры.
	* body-параметры: map - ширина и высота карты.
