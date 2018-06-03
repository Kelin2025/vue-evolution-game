import { Effect } from "~/models/effect";

export class GrazingEffect extends Effect {
  isBlocked = false;

  get isClickable() {
    return !this.isBlocked;
  }

  onStageEnd({ stage }) {
    if (stage === "feed") {
      this.isBlocked = false;
    }
  }

  // TODO: implement food
  async onOwnerClick() {
    if (this.isBlocked) return false;
    // await food.removeFromBase(1);
    this.isBlocked = true;
  }
}
