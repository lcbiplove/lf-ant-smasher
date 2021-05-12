function Ant(x, y, dimension, antAliveImage, context) {
  this.x = x;
  this.y = y;

  this.width = dimension.width;
  this.height = dimension.height;
  this.isDead = false;

  this.img = antAliveImage;

  this.speed = {
    x: (Math.random() - 0.75) * 2,
    y: (Math.random() - 0.75) * 2
  };

  this.died = antDeadImage => {
    this.img = antDeadImage;
    this.isDead = true;
    this.draw();
  };

  this.draw = () => {
    context.drawImage(this.img, this.x, this.y, this.width, this.height);

    context.save();
    context.fill();
    context.restore();
  };

  const handleWallCollision = canvasProps => {
    if (this.x <= 0 || this.x + this.width >= canvasProps.width) {
      this.speed.x = -this.speed.x;
    }
    if (this.y <= 0 || this.y + this.height >= canvasProps.height) {
      this.speed.y = -this.speed.y;
    }
    this.x += this.speed.x;
    this.y += this.speed.y;
  };

  const handleTwonAntsCollision = ants => {
    ants.forEach(ant => {
      if (
        this != ant &&
        this.x < ant.x + ant.width &&
        this.x + this.width > ant.x &&
        this.y < ant.y + ant.height &&
        this.y + this.height > ant.y
      ) {
        handleBallCollision(this, ant);
      }
    });
  };

  this.update = (ants, canvasProps) => {
    this.draw();

    handleWallCollision(canvasProps);

    handleTwonAntsCollision(ants);
  };
}
