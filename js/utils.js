/**
 * Creates score div relative to the container
 *
 * @param {string} id
 * @param {int} score
 * @returns score div
 */
const createScore = (id, score) => {
  const container = document.getElementById(id);
  container.style.position = "relative";

  const div = document.createElement("div");

  div.style.position = "absolute";
  div.style.top = "5px";
  div.style.left = "5px";
  div.style.zIndex = "2";
  div.style.fontSize = "20px";

  div.innerHTML = `Score : ${score}`;

  container.appendChild(div);

  return div;
};

/**
 * Updates score value of the div
 *
 * @param {obj} div
 * @param {int} score
 */
const updateScore = (div, score) => {
  div.innerHTML = `Score : ${score}`;
};

/**
 * Returns random position for sketches to be placed
 * without going outside of the canvas
 *
 * @param {int} min
 * @param {int} max
 * @returns int
 */
const randomPosition = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/* 
Concept of elastic colission
https://en.wikipedia.org/wiki/Elastic_collision

.......................................
*/

// Ball after collision rotates with some angle
const rotate = (speed, angle) => {
  return (newSpeed = {
    x: speed.x * Math.cos(angle) - speed.y * Math.sin(angle),
    y: speed.x * Math.sin(angle) + speed.y * Math.cos(angle)
  });
};

/**
 * Elastic collision between two balls
 *
 * Reference: https://en.wikipedia.org/wiki/Elastic_collision
 *
 * @param {obj} ball1
 * @param {obj} ball2
 */
function handleBallCollision(ball1, ball2) {
  const dx = ball2.x - ball1.x;
  const dy = ball2.y - ball1.y;

  const xDeltaVel = ball1.speed.x - ball2.speed.x;
  const yDeltaVel = ball1.speed.y - ball2.speed.y;

  if (xDeltaVel * dx + yDeltaVel * dy >= 0) {
    const angle = -Math.atan2(ball2.y - ball1.y, ball2.x - ball1.x);
    const mass = 1;

    const m1 = mass;
    const m2 = mass;

    const u1 = rotate(ball1.speed, angle);
    const u2 = rotate(ball2.speed, angle);

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

    ball1.speed.x = finalVel1.x;
    ball1.speed.y = finalVel1.y;
    ball2.speed.x = finalVel2.x;
    ball2.speed.y = finalVel2.y;
  }
}
