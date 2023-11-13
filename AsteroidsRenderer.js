import { getRandomInt } from "./utils";

export class AsteroidsRenderer {
    asteroids = []; // { x: number; y: number; initX: number }

    constructor(
        ctx, 
        template, 
        colorsMap, 
        sceneWidth, 
        sceneHeight
    ) {
        this.ctx = ctx;
        this.template = template;
        this.colorsMap = colorsMap;
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight - 40;

        this.generateAsteroids();
    }

    generateAsteroids = () => {
        for (let y = 0; y < this.sceneHeight; y++) {
            for (let x = this.sceneWidth; x < this.sceneWidth * 5; x++) {
                const random = getRandomInt(10000);

                if (random === 100) {
                    this.asteroids.push({ x, y, initX: x });
                }
            }
        }
    }

    renderAsteroid = (x, y, coef = 2) => {
        for (let j = 0; j < this.template.length; j++) {
            const row = this.template[j];

            for (let i = 0; i < row.length; i++) {
                const cell = row[i];

                if (cell === 0) continue;

                this.ctx.fillStyle = this.colorsMap[cell];
                this.ctx.fillRect(x + (i * coef), y + (j * coef), coef, coef);
            }
        }
    }

    moveAsteroids = () => {
        this.asteroids.forEach((asteroid) => {
            if (asteroid.x === -40)
                asteroid.x = asteroid.initX;
            else
                asteroid.x -= 2;
            this.renderAsteroid(asteroid.x, asteroid.y, 3);
        });
    }
}