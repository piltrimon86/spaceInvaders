class enemy {

    constructor(gameScreen, gameSize, positionLeft, positionTop) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize


        this.enemySize = {
            w: 50,
            h: 50
        }

        this.enemyPos = {
            left: positionLeft,
            top: positionTop
        }

        this.enemyVel = {
            top: 0.6
        }

        this.init()
    }

    move() {
        this.enemyPos.top += this.enemyVel.top;
        this.updatePosition();
    }


    init() {

        this.enemyElement = document.createElement(`div`)

        this.enemyElement.style.position = "absolute"
        this.enemyElement.style.backgroundImage = `url(./img/spaceMeteors_004.png)`
        this.enemyElement.style.width = `${this.enemySize.w}px`
        this.enemyElement.style.height = `${this.enemySize.h}px`
        this.enemyElement.style.left = `${this.enemyPos.left}px`
        this.enemyElement.style.top = `${this.enemyPos.top}px`
        // this.enemyElement.style.backgroundColor = `yellow`


        this.gameScreen.appendChild(this.enemyElement)
    }

    updatePosition() {
        this.enemyElement.style.top = `${this.enemyPos.top}px`;
    }

    deleteFromDom() {
        this.enemyElement.remove()
    }

}

