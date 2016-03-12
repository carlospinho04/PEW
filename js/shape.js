"use strict";
class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class SpaceShip extends Shape {
  constructor(x, y) {
    super(x, y);
  }
  drawShip(ctx, x, y) {
    var img = new Image;
    img.onload = function() {
      ctx.drawImage(img, x, y, ctx.canvas.width / 10, ctx.canvas.width / 10);
    }
    img.src = "../resources/0002.png";

  }
  renewCOORD(aux, x, y) {
    aux.clearRect(0, 0, aux.canvas.width, aux.canvas.height);
    this.drawShip(aux, x, y);
  }
  newMove(shipCtx, x, y) {
    this.x = x;
    this.y = y;
    this.renewCOORD(shipCtx, x, y);
  }

}
class Shoot extends Shape {
  constructor(x, y, r) {
    super(x, y);
  }
  drawShoot(extraCtx, x, y) {
    extraCtx.beginPath();
    extraCtx.arc(x, y, extraCtx.canvas.width / 150, 0, 2 * Math.PI);
    extraCtx.fillStyle = "#fa9731"
    extraCtx.fill();
  }
  renewCOORDS(extraCtx, x, y) {
    this.drawShoot(extraCtx, x, y);
  }
  checkCollision(enemy, extraCtx, heightMax) {
    var i;
    for (i = 0; i < enemy.length; i++) {
      if ((this.x + extraCtx.canvas.width / 150 >= enemy[i].x - enemy[i].sizeEnemy && this.x + extraCtx.canvas.width / 150 <= enemy[i].x + enemy[i].sizeEnemy) && (this.y + extraCtx.canvas.width / 150 >=
          enemy[i].y - enemy[i].sizeEnemy && this.y - extraCtx.canvas.width / 150 <= enemy[i].y + enemy[i].sizeEnemy)) {
        enemy.splice(i, 1);
        return 1;
      }
    }
  }
}

class Enemy extends Shape {
  constructor(x, y, sizeEnemy) {
    super(x, y);
    this.sizeEnemy = sizeEnemy;
  }
  drawEnemy(enemyCtx, xEnemy, yEnemy, sizeEnemy) {
    enemyCtx.beginPath();
    enemyCtx.arc(xEnemy, yEnemy, sizeEnemy, 0, 2 * Math.PI);
    enemyCtx.fillStyle = "#6a6a69"
    enemyCtx.fill();
  }
  renewCOORDE(enemyCtx, xEnemy, yEnemy, sizeEnemy) {
    this.drawEnemy(enemyCtx, xEnemy, yEnemy, sizeEnemy);
  }
}
