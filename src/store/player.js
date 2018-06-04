export const state = {
  info: {}
};

export const mutations = {
  setPlayerInfo(state, info) {
    state.info = info;
  }
};

export const getters = {
  playerInfo: ({ info }) => info
};
