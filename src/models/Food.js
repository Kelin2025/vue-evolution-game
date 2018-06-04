import nanoid from "nanoid";

export class Food {
  constructor({ type, amount }) {
    this.type = type;
    this.hash = nanoid(10);
    this.amount = amount;
  }
}
