import { CardSide } from "./CardSide";

export class Card {
  constructor(sideA, sideB) {
    this.sideA = new CardSide(sideA);
    this.sideB = new CardSide(sideB);
  }
}
