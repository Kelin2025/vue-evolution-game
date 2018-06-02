import NanoEvents from "nanoevents";

import {
  DefendEffect,
  SurviveEffect,
  PredatorEffect,
  DeathrattleEffect
} from "~/models/effects";

export class Creature {
  constructor() {
    this.bus = new NanoEvents();
    this.effects = [];
    this.isAlive = true;
    this.currentFood = 0;
  }

  get requiredFood() {
    return this.effects.reduce(
      (foodNeeded, effect) => foodNeeded + (effect.meta.foodDebuff || 0),
      1
    );
  }

  get isFed() {
    return this.currentFood === this.requiredFood;
  }

  get isPredator() {
    return this.has(PredatorEffect);
  }

  has(effectType) {
    return this.effects.some(effect => effect instanceof effectType);
  }

  getEffectsOf(effectType) {
    return this.effects.filter(effect => effect instanceof effectType);
  }

  on(evt, cb) {
    this.bus.on(evt, cb);
  }

  emit(evt, ...args) {
    this.bus.emit(evt, ...args);
  }

  off(evt, cb) {
    if (!this.bus.events[evt]) return;
    const idx = this.bus.events[evt].indexOf(cb);
    if (idx !== -1) {
      this.bus.events[evt].splice(idx, 1);
    }
  }

  addEffect(effect) {
    this.effects.push(effect);
  }

  removeEffect(effect) {
    const idx = this.effects.indexOf(effect);
    if (idx !== -1) {
      this.effects.splice(idx, 1);
    }
  }

  feed(amount) {
    this.currentFood += amount;
    this.emit("receiveFood", {
      amount,
      currentFood: this.currentFood,
      requiredFood: this.requiredFood
    });
    if (this.currentFood > this.requiredFood) {
      this.currentFood = this.requiredFood;
    }
  }

  tryToAtack(target) {
    if (!this.isPredator) {
      throw new Error("Creature is not a predator");
    }
    this.emit("attack", {
      target
    });
    target
      .tryToDefend(this)
      .then(() => {
        this.emit("attack:fail", {
          target
        });
      })
      .catch(() => {
        this.emit("attack:success", {
          target
        });
        this.feed(2);
      });
  }

  async tryToDefend(attacker) {
    for (const effect of this.has(DefendEffect)) {
      if (await effect.defend(attacker)) {
        return true;
      }
    }
    return false;
  }

  async tryToSurvive() {
    if (this.currentFood >= this.requiredFood) {
      return true;
    } else {
      for (const effect of this.getEffectsOf(SurviveEffect)) {
        if (await effect.trigger()) {
          return true;
        }
      }
      return false;
    }
  }

  async die(reason, meta = {}) {
    if (!this.isAlive) return;
    this.isAlive = false;
    for (const effect of this.getEffectsOf(DeathrattleEffect)) {
      await effect.trigger(reason, meta);
    }
  }
}
