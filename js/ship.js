class ship {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen;
        this.gameSize = gameSize;
        this.bullets = [];

        this.shipSize = {
            w: 137,
            h: 50
        }

        this.shipPos = {
            left: gameSize.w / 2 - this.shipSize.w / 2,
            top: gameSize.h - this.shipSize.h
        }

        this.shipVel = {
            left: 25
        }

        this.init()
    }

    init() {

        this.shipElement = document.createElement('div')
        this.shipElement.style.backgroundImage = `url(./img/spaceShips_005.png)`
        this.shipElement.style.position = "absolute"
        this.shipElement.style.width = `${this.shipSize.w}px`
        this.shipElement.style.height = `${this.shipSize.h}px`
        this.shipElement.style.left = `${this.shipSize.left}px`
        this.shipElement.style.top = `${this.shipSize.top}px`

        this.gameScreen.appendChild(this.shipElement)
    }

    move() {
        this.updatePosition()
        this.bullets.forEach(bullet => bullet.move())
        this.checkBorderCollision()
    }

    checkBorderCollision() {
        if (this.shipPos.left < 0) {
            this.shipPos.left = 0;
        } else if (this.shipPos.left + this.shipSize.w > this.gameSize.w) {
            this.shipPos.left = this.gameSize.w - this.shipSize.w;
        }
    }

    moveLeft() {
        if (this.shipPos.left < this.shipSize.w) {
            this.shipPos.left = 0
            //requestAnimationFrame(() => this.moveLeft())
        } else {
            if (this.shipPos.left > 0) {
                this.shipPos.left -= this.shipVel.left
            }
        }
    }


    moveRight() {
        if (this.shipPos.left > this.gameSize.w - this.shipSize.w) {
            this.shipPos.left = this.gameSize.w - this.shipSize.w
        } else {
            if (this.shipPos.left < this.gameSize.w - this.shipSize.w) {
                this.shipPos.left += this.shipVel.left
            }
        }
    }

    shoot() {
        this.bullets.push(new bullets(this.gameScreen, this.shipPos, this.shipSize));
    }

    clearBullets() {

        this.bullets.forEach((bull, idx) => {
            if (bull.bulletPos.top <= 0) {
                bull.bulletElement.remove()
                this.bullets.splice(idx, 1)
            }
        })
    }

    updatePosition() {
        this.shipElement.style.left = `${this.shipPos.left}px`
        this.shipElement.style.top = `${this.shipPos.top}px`
    }
}