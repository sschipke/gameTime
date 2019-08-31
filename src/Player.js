class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.score = 0;
  }

  updateScore(points) {
    this.score += points;
  }

}

export default Player;
