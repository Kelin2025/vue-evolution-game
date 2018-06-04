import Vue from "vue";
import Vuex from "vuex";

// Require vuex modules
const requireModule = require.context("./store", true, /\.js$/);
const modules = {};
requireModule.keys().forEach(m => {
  const moduleName = m.slice(2, -3);
  modules[moduleName] = requireModule(m);
  modules[moduleName].namespaced = true;
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules
});
