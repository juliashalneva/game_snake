export const auth = {
  namespaced: true,

  state: { user: null },

  actions: {
    login: async (context, user) => {
      context.commit("loginSuccess", user);
    },
    logout: (context) => {
      context.commit("logout");
    },
  },

  mutations: {
    loginSuccess(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
  },

  getters: {
    loggedIn: (state) => {
      return state.user === null;
    },
  },
};
