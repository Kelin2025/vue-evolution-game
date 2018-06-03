import { Effect } from "~/models/effect";

export class BurrowingEffect extends Effect {
  get canSave() {
    return this.creature.isFed;
  }

  onCreatureDefends() {
    return !!this.canSave;
  }
}
