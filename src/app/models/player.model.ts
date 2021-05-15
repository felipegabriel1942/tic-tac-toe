export class Player {
  name: string;
  mark: number;
  pontuation: number;

  constructor({ name = null, mark = null, pontuation = 0 } = {}) {
    this.name = name;
    this.mark = mark;
    this.pontuation = pontuation;
  }
}
