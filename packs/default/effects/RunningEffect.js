import { Effect } from "~/models/Effect";

export class RunningEffect extends Effect {
  // TODO: replace Math.random() with game.roll()
  onCreatureDefends() {
    return Math.random() * 6 + 1 > 3;
  }
}
