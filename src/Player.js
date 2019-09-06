class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.score = 0;
    this.multiplier = 1;
    this.fmGuesses = [];
    this.fmScore = 0;
  }
}

export default Player;
