import { Effect } from "~/models/Effect";

export class FatEffect extends Effect {
  constructor(props) {
    super(props);
    this.fats = 0;
  }

  onCreatureReceivesFood(amount) {
    const diff = this.creature.requiredFood - this.creature.currentFood;
    if (diff < amount) {
      this.fats += amount - diff;
      return amount - this.fats;
    } else {
      return amount;
    }
  }

  onCreatureDies(reason) {
    if (reason === "food") {
      const diff = this.creature.requiredFood - this.creature.currentFood;
      const foodNeeded = Math.min(this.fats, diff);
      this.creature.feed(foodNeeded);
      this.fats -= foodNeeded;
      return this.creature.requiredFood - this.creature.currentFood <= 0;
    }
  }
}
