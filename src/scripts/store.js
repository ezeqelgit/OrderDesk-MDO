import Vue from "vue";
import Vuex from "vuex";

import OrderDesk from "../components/OrderDesk/module"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    OrderDesk,
  },
});