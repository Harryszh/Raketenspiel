const app = new PIXI.Application();
const ufoList = [];
const bullets = [];  
let score = 0;
const scoreText = new PIXI.Text('Score: 0', { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
const timerText = new PIXI.Text('Time: 30', { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });  // Timer Text
let timeLeft = 30;  

document.body.appendChild(app.view);

const rocket = PIXI.Sprite.from("assets/img/rocket.png");
rocket.x = 350;
rocket.y = 520;
rocket.scale.x = 0.05;
rocket.scale.y = 0.05;
app.stage.addChild(rocket);

app.stage.addChild(scoreText);
scoreText.x = 10;
scoreText.y = 10;

app.stage.addChild(timerText);  
timerText.x = app.view.width - 150;  
timerText.y = 10;

function updateScore(points) {
    score += points;
    scoreText.text = 'Score: ' + score;
}

function updateTime() {
    timeLeft -= 1;
    timerText.text = 'Time: ' + timeLeft;

    if (timeLeft <= 0) {
        stopGame();
    }
}

gameInterval(function() {
    const ufo = PIXI.Sprite.from("assets/img/ufo" + random(1, 2) + ".png");
    ufo.x = random(0, 700);
    ufo.y = -25;
    ufo.scale.x = 0.1;
    ufo.scale.y = 0.1;
    app.stage.addChild(ufo);
    ufoList.push(ufo);
    flyDown(ufo, 1);

    waitForCollision(ufo, rocket).then(function() {
        app.stage.removeChild(rocket);
        stopGame();
    });
}, 1000);

function leftKeyPressed() {
    rocket.x -= 5;
}

function rightKeyPressed() {
    rocket.x += 5;
}

function upKeyPressed() {
    rocket.y -= 5;
}

function downKeyPressed() {
    rocket.y += 5;
}

function spaceKeyPressed() {
    const bullet = PIXI.Sprite.from("assets/img/bullet.png");
    bullet.x = rocket.x + 13;
    bullet.y = rocket.y - 10;  
    bullet.scale.x = 0.02;
    bullet.scale.y = 0.02;
    app.stage.addChild(bullet);
    bullets.push(bullet);  
}


function moveBullets() {
    bullets.forEach(bullet => {
        bullet.y -= 5;  
        if (bullet.y < 0) {  
            app.stage.removeChild(bullet);
            bullets.splice(bullets.indexOf(bullet), 1);  
        }
    });

  
    bullets.forEach(bullet => {
        ufoList.forEach(ufo => {
            waitForCollision(bullet, ufo).then(function([bullet, ufo]) {
                app.stage.removeChild(bullet);
                app.stage.removeChild(ufo);
                bullets.splice(bullets.indexOf(bullet), 1);  
                ufoList.splice(ufoList.indexOf(ufo), 1);  
                updateScore(50);
            });
        });
    });
}


app.ticker.add(() => {
    moveBullets();
});


setInterval(updateTime, 1000);


document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'ArrowLeft':
            leftKeyPressed();
            break;
        case 'ArrowRight':
            rightKeyPressed();
            break;
        case 'ArrowUp':
            upKeyPressed();
            break;
        case 'ArrowDown':
            downKeyPressed();
            break;
        case 'Space':
            spaceKeyPressed();
            break;
    }
});
