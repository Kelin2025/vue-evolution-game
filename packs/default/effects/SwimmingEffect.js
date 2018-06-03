import { Effect } from "~/models/effect";

export class SwimmingsEffect extends Effect {
  onCreatureDefends({ attacker }) {
    return !attacker.hasEffect(SwimmingsEffect);
  }
}
