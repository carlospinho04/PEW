"use strict";

(function() {
    //automatically called as soon as the javascript is loaded
    window.addEventListener("load", main);
}());




function main() {

    //Current shoots
    var shoots = [];
    //Current enemy
    var enemy = [];
    //Coords shoot
    var xShoot;
    var yShoot;
    //Coords enemy
    var returnsAux = [];
    //Var aux on shoots/enemy creation
    var shootAux;
    var enemyAux
        //Ship canvas
    var shipCtx = drawCanvas("Ship");
    //Shoots canvas
    var extraCtx = drawCanvas("extras");
    //Enemy canvas
    var enemyCtx = drawCanvas("enemy");
    //Coords ship
    var y = shipCtx.canvas.height / 2;
    var x = 0;
    //Var aux lvl
    var acceleration = 2000;
    var points = 0;
    //Main spaceship
    var spaceship = new SpaceShip(x, y);
    spaceship.drawShip(shipCtx, x, y);
    //Var enemy
    var xEnemy = enemyCtx.canvas.width;
    var heightMax = enemyCtx.canvas.height / 10;
    var heightMin = enemyCtx.canvas.height / 30;
    var sizeEnemy;
    var yEnemy;

    //Handler for keys
    function keyHandler(e) {
        e = e || window.event;
        switch (e.keyCode) {
            //Left case
            case 65:
            case 37:
                if (x > 0) {
                    x -= shipCtx.canvas.width / 20;
                    spaceship.newMove(shipCtx, x, y);
                }

                break;
                //Up case
            case 87:
            case 38:
                if (y >= -shipCtx.canvas.height / 30) {
                    y -= shipCtx.canvas.height / 20;
                    spaceship.newMove(shipCtx, x, y);
                }

                break;
                //Right case
            case 68:
            case 39:
                if (x < (shipCtx.canvas.width) - (shipCtx.canvas.width / 10)) {
                    x += shipCtx.canvas.width / 20;
                    spaceship.newMove(shipCtx, x, y);
                }

                break;
                //Down case
            case 83:
            case 40:
                if (y < (shipCtx.canvas.height) - (shipCtx.canvas.height / 6)) {
                    y += shipCtx.canvas.height / 20;
                    spaceship.newMove(shipCtx, x, y);
                }
                break;
                //Space case
            case 32:
                xShoot = x + shipCtx.canvas.width / 10;
                yShoot = y + shipCtx.canvas.height / 11;
                shootAux = new Shoot(xShoot, yShoot);
                shootAux.drawShoot(extraCtx, xShoot, yShoot);
                shoots.push(shootAux);
                break;
        }

    }
    //Shoot move
    var Shootint = setInterval(function() {
        shootMove(shoots, extraCtx, enemy);
    }, 50);
    //Spam enemy
    var Spamtint = setInterval(function() {
        randomEnemy(enemyCtx, yEnemy, xEnemy, heightMin, heightMax, sizeEnemy, enemyAux, enemy);
    }, acceleration);
    //Ememy move
    var Enemytint = setInterval(function() {
        enemyMove(enemy, enemyCtx, spaceship, Shootint, Spamtint, Enemytint);
    }, 100);


    document.onkeydown = keyHandler;

}

function randomEnemy(enemyCtx, yEnemy, xEnemy, heightMin, heightMax, sizeEnemy, enemyAux, enemy) {
    sizeEnemy = Math.floor((Math.random() * heightMax) + heightMin);
    yEnemy = Math.floor((Math.random() * (enemyCtx.canvas.height - 2*sizeEnemy)) + sizeEnemy);
    enemyAux = new Enemy(xEnemy, yEnemy, sizeEnemy);
    enemyAux.drawEnemy(enemyCtx, xEnemy, yEnemy, sizeEnemy);
    enemy.push(enemyAux);
}

//Canva's draw
function drawCanvas(canvasName) {
    var canvas = document.getElementById(canvasName);
    var ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    return ctx;
}q

function shootMove(shoots, extraCtx, enemy, heightMax) {
    var i = 0;
    var aux = 0;
    extraCtx.clearRect(0, 0, extraCtx.canvas.width, extraCtx.canvas.height);
    for (i = 0; i < shoots.length; i++) {
        if (shoots[i].x < extraCtx.canvas.width) {
            shoots[i].x += extraCtx.canvas.height / 20;
            shoots[i].renewCOORDS(extraCtx, shoots[i].x, shoots[i].y);
            aux = shoots[i].checkCollision(enemy, extraCtx, heightMax);
            if (aux == 1) {
                shoots.shift();
            }
        } else {
            shoots.shift();
        }
    }
}

function enemyMove(enemy, enemyCtx, spaceship, Shootint, Spamtint, Enemytint) {
    var z = 0;
    var aux = 0;
    enemyCtx.clearRect(0, 0, enemyCtx.canvas.width, enemyCtx.canvas.height);
    for (z = 0; z < enemy.length; z++) {
        if (enemy[z].x > -enemy[z].sizeEnemy) {
            enemy[z].x -= enemyCtx.canvas.width / enemy[z].sizeEnemy;
            aux = enemy[z].checkCollision(enemyCtx, spaceship, enemy);
            enemy[z].renewCOORDE(enemyCtx, enemy[z].x, enemy[z].y, enemy[z].sizeEnemy);
            if (aux == 1 && enemy.length > 0) {
                gameOver(Shootint, Spamtint, Enemytint, enemyCtx);
            }

        } else {
            gameOver(Shootint, Spamtint, Enemytint, enemyCtx);
        }
    }
}

function gameOver(Shootint, Spamtint, Enemytint, enemyCtx) {
    clearInterval(Shootint);
    clearInterval(Spamtint);
    clearInterval(Enemytint);
    enemyCtx.font = "30px Arial";
    enemyCtx.fillStyle = "#111112";
    enemyCtx.fillText("GameOver", enemyCtx.canvas.width / 2, enemyCtx.canvas.height / 2);
}
