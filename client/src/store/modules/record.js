import RecordService from "@/services/record_service";

export const record = {
  namespaced: true,
  state: null,
  actions: {
    get: async (context) => {
      return await RecordService.get().then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },

    create: async (context, payload) => {
      return await RecordService.create(payload.username, payload.score).then(
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
