import { curry } from "nanoutils";

const STAGES = ["turn", "feed", "extinction"];

const unlessGteThan = curry(
  (maxVal, orVal, val) => (val >= maxVal ? orVal : val)
);

const nextOrFirstIdx = curry((list, val) => unlessGteThan(list.length, 0, val));

export const state = {
  id: null,
  stage: "turn",
  cards: [],
  players: [],
  creatures: [],
  currentPlayerIdx: 0
};

export const mutations = {
  reset(state) {
    state.id = null;
    state.stage = "turn";
    state.cards = [];
    state.currentPlayerIdx = 0;
  },

  setId(state, id) {
    state.id = id;
  },

  addCards(state, cards) {
    state.cards.push(...cards);
  },

  addPlayers(state, players) {
    state.players.push(...players);
  },

  setCurrentPlayerIdx(state, currentPlayerIdx) {
    state.currentPlayerIdx = currentPlayerIdx;
  },

  setStage(state, stage) {
    state.stage = stage;
  }
};

export const actions = {
  start({ commit }, { id, cards, players }) {
    commit("reset");
    commit("setId", id);
    commit("addCards", cards);
    commit("addPlayers", players);
  },

  join({ commit, getters }) {
    commit("addPlayers", [getters["player/info"]]);
  },

  setStage({ commit }, stage) {
    commit("setStage", stage);
  },

  nextTurn({ state, commit }) {
    const nextIdx = nextOrFirstIdx(state.players, state.currentPlayerIdx + 1);
    commit("setCurrentPlayerIdx", nextIdx);
  },

  nextStage({ commit }) {
    commit(
      "setStage",
      STAGES[nextOrFirstIdx(STAGES, STAGES.indexOf(state.stage) + 1)]
    );
  }
};

export const getters = {
  creatureOf: ({ creatures }) => user =>
    creatures.filter(creature => creature.owner === user)
};
