import GameService from "@/services/game_service";

export const game = {
  namespaced: true,
  state: null,
  actions: {
    move: async (context, payload) => {
      return await GameService.move(
        payload.direction,
        payload.snake,
        payload.apple,
        payload.map,
        payload.score
      ).then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },

    start: async (context, payload) => {
      return await GameService.start(payload.map).then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {},
  getters: {},
};
