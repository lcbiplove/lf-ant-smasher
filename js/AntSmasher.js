function AntSmasher(props) {
  this.canvas = document.querySelector(`#${props.id} canvas`);
  this.context = this.canvas.getContext("2d");
  this.width = props.width || DEFAULT_WIDTH;
  this.height = props.height || DEFAULT_HEIGHT;

  this.score = 0;

  this.scoreDiv = createScore(props.id, this.score);

  this.numOfAnts = props.numOfAnts || DEFAULT_NUM_OF_ANTS;
  this.ants = [];

  this.canvas.width = this.width;
  this.canvas.height = this.height;

  this.antAliveImage = document.querySelector(`#${props.id} .ant-alive`);
  this.antDeadImage = document.querySelector(`#${props.id} .ant-dead`);

  this.antAliveImage.style.display = "none";
  this.antDeadImage.style.display = "none";

  this.dimension = !props.dimension ? DEFAULT_ANT_DIMENSION : props.dimension;

  this.createAnts = () => {
    for (let ind = 0; ind < this.numOfAnts; ind++) {
      const x = randomPosition(
        this.dimension.width,
        this.width - this.dimension.width
      );
      const y = randomPosition(
        this.dimension.height,
        this.height - this.dimension.height
      );

      this.ants.push(
        new Ant(x, y, this.dimension, this.antAliveImage, this.context)
      );
    }
  };

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

        updateScore(this.scoreDiv, this.score);
      }
    });
  };

  this.draw();

  this.createAnts();

  this.update();
}
