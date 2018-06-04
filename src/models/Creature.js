import NanoEvents from "nanoevents";

export class Creature {
  bus = new NanoEvents();
  food = [];
  effects = [];
  isAlive = true;

  get currentFood() {
    return this.food.length;
  }

  get requiredFood() {
    return this.effects.reduce(
      (foodNeeded, effect) => foodNeeded + (effect.foodNeeded || 0),
      1
    );
  }

  get isFed() {
    return this.currentFood === this.requiredFood;
  }

  has(EffectClass) {
    return this.effects.some(effect => effect instanceof EffectClass);
  }

  getEffectsOf(EffectClass) {
    return this.effects.filter(effect => effect instanceof EffectClass);
  }

  getEffectsWith(method) {
    return this.effects.filter(effect => method in effect);
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
    return this;
  }

  removeEffect(effect) {
    const idx = this.effects.indexOf(effect);
    if (idx !== -1) {
      this.effects.splice(idx, 1);
    }
    return this;
  }

  feed(FoodClass, amount) {
    const realAmount = Math.min(this.requiredFood, amount);
    for (let i = 0; i < realAmount; i++) {
      this.food.push(new FoodClass());
    }
    return this;
  }

  feedWith(...items) {
    this.food.push(...items);
    return this;
  }

  async tryToAtack(target) {
    let nextTarget = target;
    for (const effect of this.getEffectsWith("onCreatureAttacks")) {
      nextTarget = await effect.onCreatureAttacks({ target });
    }
    if (!nextTarget) return;
    return await nextTarget.tryToDefend(this);
  }

  async tryToDefend(attacker) {
    for (const effect of this.getEffectsWith("onCreatureDefends")) {
      const res = await effect.onCreatureDefends({ attacker });
      if (res === true) {
        return true;
      }
      if (res instanceof Creature) {
        return await attacker.tryToAtack(res);
      }
    }
    return await this.die("creature", { attacker });
  }

  async tryToSurvive() {
    if (this.currentFood >= this.requiredFood) {
      this.food = [];
      return true;
    } else {
      return await !this.die("food");
    }
  }

  async die(reason, meta = {}) {
    if (!this.isAlive) return;
    this.isAlive = false;
    for (const effect of this.getEffectsWith("onCreatureDies")) {
      if (await effect.onCreatureDies(reason, meta)) {
        this.isAlive = true;
        return true;
      }
    }
    return false;
  }
}
