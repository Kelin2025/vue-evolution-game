import { Effect } from "~/models/effect";

export class PoisonousEffect extends Effect {
  onCreatureDies(reason, { attacker }) {
    if (reason === "creature") {
      attacker.die("effect", { effect: this, creature: this.creature });
    }
  }
}
