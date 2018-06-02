// Looks like we need class "Buff"
// Because some effects can have different buffs
export class Effect {
  constructor({ type, creature }) {
    this.type = type;
    this.creature = creature;
  }
}

export class PredatorEffect extends Effect {
  constructor({ creature }) {
    super({
      type: "predator",
      creature
    });
  }
}

export class DefendEffect extends Effect {
  constructor({ creature }) {
    super({
      type: "defend",
      creature
    });
  }
}

export class SurviveEffect extends Effect {
  constructor({ creature }) {
    super({ type: "survive", creature });
  }
}

export class MiscEffect extends Effect {
  constructor({ creature }) {
    super({ type: "misc", creature });
  }
}

export class DeathrattleEffect extends Effect {
  constructor({ creature }) {
    super({ type: "deathrattle", creature });
  }
}

export class FatEffect extends SurviveEffect {
  constructor(props) {
    super(props);
    this.fats = 0;
  }

  increaseFats() {
    this.fats++;
  }

  survive() {
    const diff = this.creature.requiredFood - this.creature.currentFood;
    const foodNeeded = Math.min(this.fats, diff);
    this.creature.feed(foodNeeded);
    this.fats -= foodNeeded;
    return this.creature.requiredFood - this.creature.currentFood <= 0;
  }
}

export class BurrowingEffect extends DefendEffect {
  get canSave() {
    return this.creature.isFed;
  }

  defend() {
    return !!this.canSave;
  }
}

export class SwimmingsEffect extends DefendEffect {
  defend(attacker) {
    return !attacker.hasEffect(SwimmingsEffect);
  }
}

export class LargeEffect extends DefendEffect {
  constructor(props) {
    super(props);
    this.foodCost = 1;
  }

  defend(attacker) {
    return !attacker.hasEffect(LargeEffect);
  }
}

export class CamouflageEffect extends DefendEffect {
  defend(attacker) {
    return !attacker.hasEffect(SharpVisionEffect);
  }
}

export class TailLossEffect extends DefendEffect {
  async defend() {
    // TODO: Implement "Choose effect" global method
    // const effect = await game.chooseEffect({
    //   creature: this.creature,
    //   abortable: true
    // });
    // if (effect) {
    //   this.creature.removeEffect(effect);
    //   return true;
    // } else {
    //   return false;
    // }
  }
}

export class SharpVisionEffect extends MiscEffect {}

export class PoisonousEffect extends DeathrattleEffect {
  trigger(reason, { attacker }) {
    if (reason === "enemy") {
      attacker.die();
    }
  }
}
