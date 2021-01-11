<template>
  <v-row class="fill-height">
    <v-col cols="12" class="fill-height ma-0 pa-0">
      <v-app-bar flat>
        <v-card-title> Баллы: {{ score }} </v-card-title>
        <v-spacer></v-spacer>
        <v-btn text @click="records" v-if="start == false">
          Таблица рекордов<v-icon>emoji_events</v-icon>
        </v-btn>
        <v-btn text @click="startGame" v-if="start == false" color="success">
          Старт<v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn text @click="pauseGame" v-if="start == true" color="red">
          Пауза<v-icon>pause</v-icon>
        </v-btn>
        <v-btn text @click="endGame" v-if="start == true" >
          Закончить игру<v-icon>outlined_flag</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card>
        <canvas id="map" ref="map" :width="width" :height="height"> </canvas>
      </v-card>

      <template>

        <v-snackbar
          timeout="6000"
          bottom="bottom"
          color="red lighten-1"
          v-model="snackbar"
        >
          {{ message }}
        </v-snackbar>
      </template>
    </v-col>

    <template>
      <v-dialog v-model="pauseDialog" persistent max-width="600px">
        <v-card>
          <v-card-title class="ma-0 pa-5">
            <v-btn text @click="resumeGame" color="success">
              Продолжить игру<v-icon>play_arrow</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-dialog v-model="recordsDialog" persistent max-width="600px">
        <Records v-bind:recordsDialog.sync="recordsDialog" />
      </v-dialog>
      <v-dialog v-model="endGameDialog" persistent max-width="600px">
        <v-card>
          <v-card-title class="ma-0 pa-5">
            Кол-во баллов: {{ score }} <v-spacer></v-spacer
            ><v-btn text @click="closeEndGameDialog"><v-icon>close</v-icon></v-btn>
          </v-card-title>
        </v-card>
      </v-dialog>
    </template>
  </v-row>
</template>

<script>
import Records from "@/components/Records";
export default {
  name: "Game",
  props: ["currentUser"],
  components: { Records },
  computed: {
    speed() {
      return (this.score / 10000) * 100 + 100;
    },
  },
  data: () => ({
    score: 0,
    message: "",
    snackbar: false,
    direction: null,
    snake: null,
    apple: null,
    map: { width: 0, height: 0 },
    itemSize: { width: 20, height: 20 },
    width: 0,
    height: 0,
    ctx: null,
    pauseDialog: false,
    recordsDialog: false,
    endGameDialog: false,
    start: false,
    pause: false,
  }),
  mounted() {
    if (this.currentUser == null) {
      this.$router.push("/");
    }
    this.ctx = this.$refs.map.getContext("2d");

    //this.loadGameParams();
  },
  created() {
    window.addEventListener("resize", this.updateSize);
    this.updateSize();
    window.addEventListener("keydown", this.keyPush);
  },

  methods: {
    updateSize() {
      this.map.width = Math.floor(
        (window.innerWidth - 50) / this.itemSize.width
      );
      this.map.height = Math.floor(
        (window.innerHeight - 100) / this.itemSize.height
      );
      this.width = this.map.width * this.itemSize.width;
      this.height = this.map.height * this.itemSize.height;
    },

    startGame() {
      this.start = true;
      this.loadGameParams();
    },

    pauseGame() {
      this.pause = true;
      this.pauseDialog = true;
    },

    resumeGame() {
      this.pauseDialog = false;
      this.pause = false;
      this.move();
    },

    endGame() {
      this.start = false;
      this.$store.dispatch("record/create", {
        username: this.currentUser.username,
        score: this.score,
      });
      this.clearMap();
      this.endGameDialog = true;
    },

    records() {
      this.recordsDialog = true;
    },

    closeEndGameDialog() {
      this.score = 0;
      this.endGameDialog = false;
    },

    loadGameParams() {
      this.$store
        .dispatch("game/start", {
          map: this.map,
        })
        .then((data) => {
          this.direction = data.direction;
          this.apple = data.apple;
          this.snake = data.snake;
          this.drawMap();
          this.move();
        });
    },

    move() {
      if (!this.pause && this.start) {
        setTimeout(() => {
          this.$store
            .dispatch("game/move", {
              direction: this.direction,
              map: this.map,
              snake: this.snake,
              apple: this.apple,
              score: this.score,
            })
            .then((data) => {
              if (!this.pause && this.start) {
                this.snake = data.snake;
                this.apple = data.apple;
                this.score = data.score;
                this.drawMap();
                this.move();
              }
            });
        }, this.speed);
      }
    },

    clearMap() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },

    drawMap() {
      this.clearMap();

      //snake head
      this.ctx.fillStyle = "green";
      // this.ctx.fillRect(
      //   this.snake[0].x * this.itemSize.width,
      //   this.snake[0].y * this.itemSize.height,
      //   this.itemSize.width,
      //   this.itemSize.height
      // );
      this.ctx.beginPath();
      this.ctx.arc(
        this.snake[0].x * this.itemSize.width + this.itemSize.width / 2,
        this.snake[0].y * this.itemSize.height + this.itemSize.height / 2,
        this.itemSize.width / 2,
        0,
        Math.PI * 2,
        false
      );
      this.ctx.closePath();
      this.ctx.fill();

      //snake body
      this.ctx.fillStyle = "green";
      for (let i = 1; i < this.snake.length; i++) {
        // this.ctx.fillRect(
        //   this.snake[i].x * this.itemSize.width,
        //   this.snake[i].y * this.itemSize.height,
        //   this.itemSize.width,
        //   this.itemSize.height
        // );
        this.ctx.beginPath();
        this.ctx.arc(
          this.snake[i].x * this.itemSize.width + this.itemSize.width / 2,
          this.snake[i].y * this.itemSize.height + this.itemSize.height / 2,
          this.itemSize.width / 2,
          0,
          Math.PI * 2,
          false
        );
        this.ctx.closePath();
        this.ctx.fill();
      }
//apple
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(
        this.apple.x * this.itemSize.width,
        this.apple.y * this.itemSize.height,
        this.itemSize.width,
        this.itemSize.height
      );
    },

    keyPush(event) {
      //console.log(event);
      switch (event.code) {
        case "ArrowLeft":
          this.direction = { x: -1, y: 0 };
          break;
        case "ArrowUp":
          this.direction = { x: 0, y: -1 };
          break;
        case "ArrowRight":
          this.direction = { x: 1, y: 0 };
          break;
        case "ArrowDown":
          this.direction = { x: 0, y: 1 };
          break;
      }
      console.log(this.direction);
    },
  },
};
</script>
