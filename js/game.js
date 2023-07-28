const Game = {
    gameScreen: document.querySelector("#game-screen"),
    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },

    background: undefined,
    ship: undefined,
    allEnemies: [],
    allEnemies1: [],
    positionLeft: undefined,
    positionTop: undefined,

    gameAudio: new Audio("./audio/party.mp3"),


    keys: { LEFT: 'ArrowLeft', RIGHT: 'ArrowRight', SPACE: "Space" },

    init() {
        this.setDimensions()
        this.setEventListeners()
        this.start()

        this.gameAudio.volume = 0.3

    },

    setDimensions() {
        this.gameScreen.style.width = `${this.gameSize.w}px`
        this.gameScreen.style.height = `${this.gameSize.h}px`
    },

    start() {
        this.createElements()
        this.gameLoop()
    },

    setEventListeners() {
        document.addEventListener("keydown", event => {
            switch (event.code) {
                case this.keys.LEFT:
                    this.ship.moveLeft();
                    break;
                case this.keys.RIGHT:
                    this.ship.moveRight();
                    break;
            }
        });

        document.addEventListener("keyup", event => {
            if (event.code === this.keys.SPACE) {
                this.ship.shoot();
            }
        });
    },

    createElements() {

        this.background = new background(this.gameScreen, this.gameSize)

        this.ship = new ship(this.gameScreen, this.gameSize, this.keys)

        for (let i = 0; i < 15; i++) {
            this.positionLeft = i * 80 + 50
            this.positionTop = 0
            this.allEnemies.push(new enemy(this.gameScreen, this.gameSize, this.positionLeft, this.positionTop))
        }

        for (let j = 0; j < 15; j++) {
            this.positionLeft = j * 80 + 50
            this.positionTop = 100
            this.allEnemies1.push(new enemy(this.gameScreen, this.gameSize, this.positionLeft, this.positionTop))
        }
    },

    gameLoop() {
        this.gameAudio.play()
        this.drawAll();
        this.collisionEnemies();
        this.collisionGameOver() && this.gameOver();
        window.requestAnimationFrame(() => this.gameLoop());
        this.ship.clearBullets(eachBullet => eachBullet.move());
    },

    drawAll() {
        this.background.move()
        this.ship.move(eachShip => eachShip.move())
        this.allEnemies.forEach(enemy => enemy.move())
        this.allEnemies1.forEach(enemy => enemy.move())

    },

    collisionEnemies() {

        this.allEnemies.forEach((enemy, i) => {
            this.ship.bullets.forEach((bullet, j) => {
                if (enemy.enemyPos.left < bullet.bulletPos.left + bullet.bulletSize.w &&
                    enemy.enemyPos.left + enemy.enemySize.w > bullet.bulletPos.left &&
                    enemy.enemyPos.top < bullet.bulletPos.top + bullet.bulletSize.h &&
                    enemy.enemySize.h + enemy.enemyPos.top > bullet.bulletPos.top) {
                    enemy.deleteFromDom()
                    bullet.deleteFromDom()
                    this.allEnemies.splice(i, 1)
                    this.ship.bullets.splice(j, 1)
                }
            })
        })

        this.allEnemies1.forEach((enemy, i) => {
            this.ship.bullets.forEach((bullet, j) => {
                if (enemy.enemyPos.left < bullet.bulletPos.left + bullet.bulletSize.w &&
                    enemy.enemyPos.left + enemy.enemySize.w > bullet.bulletPos.left &&
                    enemy.enemyPos.top < bullet.bulletPos.top + bullet.bulletSize.h &&
                    enemy.enemySize.h + enemy.enemyPos.top > bullet.bulletPos.top) {
                    enemy.deleteFromDom()
                    bullet.deleteFromDom()
                    this.allEnemies1.splice(i, 1)
                    this.ship.bullets.splice(j, 1)
                }
            })

        })

        if (this.allEnemies.length === 0 && this.allEnemies1.length === 0) {
            alert(`YOU WIN`)
        }
    },

    collisionGameOver() {

        this.allEnemies.forEach((enemy) => {
            if (enemy.enemyPos.top + enemy.enemySize.h > this.ship.shipPos.top) {
                return this.gameOver()
            }
        });

        this.allEnemies1.forEach((enemy) => {
            if (enemy.enemyPos.top + enemy.enemySize.h > this.ship.shipPos.top) {
                return this.gameOver()
            }
        });
    },

    gameOver() {
        alert('GAME OVER')
    }

}