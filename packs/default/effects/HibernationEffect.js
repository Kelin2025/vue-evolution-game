import { Effect } from "~/models/effect";

export class HibernationEffect extends Effect {
  onOwnerClick() {
    this.creature.currentFood = this.creature.requiredFood;
  }
}
