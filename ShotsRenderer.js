export class ShotsRenderer {
    shots = []; // { x, y };

    constructor(ctx, sceneWidth) {
        this.ctx = ctx;
        this.sceneWidth = sceneWidth + 10;
    }

    addShot = (x, y) => {
        this.shots.push({ x, y });
    }

    renderShot = (x, y) => {
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(x, y, 5, 2);
    }

    moveShots = (onMoveShots) => {
        this.shots.forEach((shot) => {
            if (shot.x < this.sceneWidth) {
                shot.x += 10;
                this.renderShot(shot.x, shot.y);
            }
        });

        onMoveShots();
    }
}