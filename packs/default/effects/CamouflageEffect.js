import { Effect } from "~/models/effect";
import { SharpVisionEffect } from "./sharpvision";

export class CamouflageEffect extends Effect {
  defend(attacker) {
    return !attacker.hasEffect(SharpVisionEffect);
  }
}
