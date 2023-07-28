class bullets {
    constructor(gameScreen, shipPos, shipSize) {
        this.gameScreen = gameScreen;
        this.shipPos = shipPos;
        this.shipSize = shipSize;
        const offset = 10


        this.bulletPos = {
            left: shipPos.left + shipSize.w / 2 - offset,
            top: shipPos.top + shipSize.h / 2
        };

        this.bulletVel = {
            left: 0,
            top: 10
        };

        this.bulletSize = {
            w: 20,
            h: 40
        };

        this.bulletElement = document.createElement("div");
        this.shootSound = new Audio("./audio/disparoLaser.mp3");
        this.shootSound.volume = 0.1;

        this.init();
    }

    init() {
        this.bulletElement.style.position = "absolute";
        this.bulletElement.style.backgroundImage = `url(./img/spaceMissiles_018.png)`
        this.bulletElement.style.width = `${this.bulletSize.w}px`;
        this.bulletElement.style.height = `${this.bulletSize.h}px`;
        this.bulletElement.style.left = `${this.bulletPos.left}px`;
        this.bulletElement.style.top = `${this.bulletPos.top}px`;
        this.shootSound.play();

        this.gameScreen.appendChild(this.bulletElement);
    }

    move() {
        this.bulletPos.left += this.bulletVel.left;
        this.bulletPos.top += this.bulletVel.top;

        if (this.bulletPos.top >= this.shipPos.top + this.shipSize.h) {
            this.bulletVel.top *= -1;
        }

        this.updatePosition();
    }


    updatePosition() {
        this.bulletElement.style.left = `${this.bulletPos.left}px`;
        this.bulletElement.style.top = `${this.bulletPos.top}px`;
    }

    deleteFromDom() {
        this.bulletElement.remove()
    }
}
