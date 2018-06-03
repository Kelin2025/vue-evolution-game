import { Effect } from "~/models/Effect";

export class MimicryEffect extends Effect {
  isBlocked = false;

  onStageEnd({ stage }) {
    if (stage === "feed") {
      this.isBlocked = false;
    }
  }

  // TODO: implement players
  async onCreatureDefends() {
    // if (this.isBlocked) {
    //   return false;
    // }
    // if (player.creatures.length <= 2) {
    //   return false;
    // }
    // const creature = await player.chooseCreature({
    //   player: player,
    //   exclude: [this.creature]
    // });
    // if (!creature) {
    //   return false;
    // }
    // this.isBlocked = true;
    // return creature;
  }
}
