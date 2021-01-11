import Vue from "vue";
import Vuex from "vuex";
import { auth } from "@/store/modules/auth";
import { game } from "@/store/modules/game";
import { record } from "@/store/modules/record";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    game,
    record,
  },
});
