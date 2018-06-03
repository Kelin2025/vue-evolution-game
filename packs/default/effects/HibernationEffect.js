import { Effect } from "~/models/effect";

export class HibernationEffect extends Effect {
  turnsBlock = 0;

  get isClickable() {
    return this.turnsBlock === 0;
  }

  onStageEnd({ stage }) {
    if (stage !== "feed") return;
    if (this.turnsBlock === 0) return;
    this.turnsBlock -= 1;
  }

  onOwnerClick() {
    this.turnsBlock = 2;
    this.creature.currentFood = this.creature.requiredFood;
  }
}
