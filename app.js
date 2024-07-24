const app = new PIXI.Application();
const ufoList =[];
let score = 0;
const scoreText = new PIXI.Text('Score: 0', {fontFamily: 'Arial', fontSize: 24, fill: 0xffffff});

document.body.appendChild(app.view);

const rocket = PIXI.Sprite.from("assets/img/rocket.png");
rocket.x = 350;
rocket.y = 520;
rocket.scale.x = 0.05;
rocket.scale.y = 0.05;
app.stage.addChild(rocket);

app.stage.addChild(scoreText);

function updateScore(points) {
    score += points;
    scoreText.text = 'Score: ' + score;
}

gameInterval(function(){
    const ufo = PIXI.Sprite.from("assets/img/ufo" + random(1,2) + ".png");
    ufo.x = random(0, 700);
    ufo.y = -25;
    ufo.scale.x = 0.1;
    ufo.scale.y = 0.1;
    app.stage.addChild(ufo);
    ufoList.push(ufo)
    flyDown(ufo, 1);

    waitForCollision(ufo, rocket).then(function(){
        app.stage.removeChild(rocket);
        stopGame();
    });
}, 1000);

function leftKeyPressed(){
    rocket.x = rocket.x -5;
}

function rightKeyPressed(){
    rocket.x = rocket.x +5;
}

function upKeyPressed(){
    rocket.y = rocket.y -5;
}

function downKeyPressed(){
    rocket.y = rocket.y +5;
}

function spaceKeyPressed() {
    const bullet = PIXI.Sprite.from("assets/img/bullet.png");
    bullet.x = rocket.x + 13;
    bullet.y = 500;
    bullet.scale.x = 0.02;
    bullet.scale.y = 0.02;
    flyUp(bullet);
    app.stage.addChild(bullet);

    waitForCollision(bullet, ufoList).then(function([bullet, ufo]){
        app.stage.removeChild(bullet);
        app.stage.removeChild(ufo);
        updateScore(50);
    });
}