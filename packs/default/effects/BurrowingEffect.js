import { Effect } from "~/models/effect";

export class BurrowingEffect extends Effect {
  onCreatureDefends() {
    return !!this.creature.isFed;
  }
}
