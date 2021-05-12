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

  const handlerFourSideCollision = canvasProps => {
    if (this.x <= 0 || this.x + this.width >= canvasProps.width) {
      this.speed.x = -this.speed.x;
    }
    if (this.y <= 0 || this.y + this.height >= canvasProps.height) {
      this.speed.y = -this.speed.y;
    }
    this.x += this.speed.x;
    this.y += this.speed.y;
  };

  const rotate = (speed, angle) => {
    return (newSpeed = {
      x: speed.x * Math.cos(angle) - speed.y * Math.sin(angle),
      y: speed.x * Math.sin(angle) + speed.y * Math.cos(angle)
    });
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
        const dx = ant.x - this.x;
        const dy = ant.y - this.y;

        const xDeltaVel = this.speed.x - ant.speed.x;
        const yDeltaVel = this.speed.y - ant.speed.y;

        if (xDeltaVel * dx + yDeltaVel * dy >= 0) {
          const angle = -Math.atan2(ant.y - this.y, ant.x - this.x);
          const mass = 1;

          const m1 = mass;
          const m2 = mass;

          const u1 = rotate(this.speed, angle);
          const u2 = rotate(ant.speed, angle);

          const v1 = {
            x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
            y: u1.y
          };
          const v2 = {
            x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
            y: u2.y
          };

          const finalVel1 = rotate(v1, -angle);
          const finalVel2 = rotate(v2, -angle);

          this.speed.x = finalVel1.x;
          this.speed.y = finalVel1.y;
          ant.speed.x = finalVel2.x;
          ant.speed.y = finalVel2.y;
        }
      }
    });
  };

  this.update = (ants, canvasProps) => {
    this.draw();

    handlerFourSideCollision(canvasProps);

    handleTwonAntsCollision(ants);
  };
}
