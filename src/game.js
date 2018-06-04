import { times } from "nanoutils";
import NanoEvents from "nanoevents";

import store from "./store";

// You can replace it with socket server
export const GameBus = new NanoEvents();
window.GameBus = GameBus;

const roll = () => Math.random() * 6 + 1 > 3;

const getPlayer = () => store.getters["player/info"];

export const Game = {
  // Roll N cubes
  // Also playes cubes roll animation
  roll(cubes = 1) {
    const player = getPlayer();
    GameBus.emit("someone:roll.start", { player, cubes });
    // Emulate server response
    setTimeout(() => {
      const values = times(roll, cubes);
      const total = values.reduce((res, cur) => res + cur, 0);
      GameBus.emit("someone:roll.stop", { player, cubes, values, total });
    }, 500);
    return new Promise(resolve => {
      const unbind = GameBus.on("someone:roll.stop", data => {
        resolve(data);
        unbind();
      });
    });
  },

  // Pick a creature
  pickCreature({ player, include = null, exclude = null }) {
    let creatures = include ? include : store.state.creatures;
    if (exclude) {
      creatures = creatures.filter(creature => exclude.includes(creature));
    }
    GameBus.emit("someone:creature-pick.start", { player, creatures });
    return new Promise(resolve => {
      const unbind = GameBus.on("someone:creature-pick.stop", data => {
        resolve(data);
        unbind();
      });
    });
  }
};
