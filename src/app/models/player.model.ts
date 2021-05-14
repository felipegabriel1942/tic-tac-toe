export class Player {
  name: string;
  mark: number;

  constructor({ name = null, mark = null } = {}) {
    this.name = name;
    this.mark = mark;
  }
}
