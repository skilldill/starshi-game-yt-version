import { getRandomInt } from "./utils";

export class StarsRenderer {
    stars = []; // { x: number, y: number; }

    constructor(ctx, sceneWidth, sceneHeight) {
        this.ctx = ctx;
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;

        this.generateStars();
    }

    generateStars = () => {
        for (let y = 0; y < this.sceneHeight; y++) {
            for (let x = 0; x < this.sceneWidth; x++) {
                const random = getRandomInt(1000);
                
                if(random === 100) {
                    this.stars.push({ x, y });
                }
            }
        }
    }

    renderStar = (x, y) => {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(x, y, 1, 1);
    }

    moveStars = () => {
        this.stars.forEach((star) => {
            if (star.x === 0)
                star.x = this.sceneWidth;
            else 
                star.x -= 1;
            
            this.renderStar(star.x, star.y);
        });
    }
}