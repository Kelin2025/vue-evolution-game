import { Effect } from "~/models/effect";

export class HighBodyWeightEffect extends Effect {
  get foodNeeded() {
    return 1;
  }

  onCreatureDefends(attacker) {
    return !attacker.hasEffect(HighBodyWeightEffect);
  }
}
