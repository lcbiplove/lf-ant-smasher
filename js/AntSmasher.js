function AntSmasher(props) {
  this.canvas = document.querySelector(`#${props.id} canvas`);
  this.context = this.canvas.getContext("2d");
  this.width = props.width || DEFAULT_WIDTH;
  this.height = props.height || DEFAULT_HEIGHT;

  this.score = 0;

  const createScore = () => {
    const container = document.getElementById(props.id);
    container.style.position = "relative";

    const div = document.createElement("div");

    div.style.position = "absolute";
    div.style.top = "5px";
    div.style.left = "5px";
    div.style.zIndex = "2";
    div.style.fontSize = "20px";

    div.innerHTML = `Score : ${this.score}`;

    container.appendChild(div);

    return div;
  };

  const updateScore = score => {
    this.scoreDiv.innerHTML = `Score : ${this.score}`;
  };

  this.scoreDiv = createScore();

  this.numOfAnts = props.numOfAnts || DEFAULT_NUM_OF_ANTS;
  this.ants = [];

  this.canvas.width = this.width;
  this.canvas.height = this.height;

  this.antAliveImage = document.querySelector(`#${props.id} .ant-alive`);
  this.antDeadImage = document.querySelector(`#${props.id} .ant-dead`);

  this.antAliveImage.style.display = "none";
  this.antDeadImage.style.display = "none";

  this.dimension = !props.dimension ? DEFAULT_ANT_DIMENSION : props.dimension;

  const ants = [];

  const randomPosition = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  for (let ind = 0; ind < this.numOfAnts; ind++) {
    // Prevent position outside of the canvas
    const x = randomPosition(
      this.dimension.width,
      this.width - this.dimension.width
    );
    const y = randomPosition(
      this.dimension.height,
      this.height - this.dimension.height
    );

    ants.push(new Ant(x, y, this.dimension, this.antAliveImage, this.context));
  }

  this.ants = ants;

  this.draw = () => {
    this.context.clearRect(0, 0, this.width, this.height);
  };

  this.update = () => {
    window.requestAnimationFrame(() => this.update());

    this.context.clearRect(0, 0, this.width, this.height);

    this.ants.forEach(ant => ant.update(this.ants, this));
  };

  this.canvas.onclick = event => {
    const mouse = {};
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    this.ants.forEach(ant => {
      if (
        !ant.isDead &&
        mouse.x >= ant.x &&
        mouse.x <= ant.x + ant.width &&
        mouse.y >= ant.y &&
        mouse.y <= ant.y + ant.height
      ) {
        ant.died(this.antDeadImage);
        this.score++;

        updateScore(this.score);
      }
    });
  };

  this.update();
}
