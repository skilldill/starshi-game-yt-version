export class StarshipRenderer {
    constructor(ctx, template, colorsMap) {
        this.ctx = ctx;
        this.template = template;
        this.colorsMap = colorsMap;
    }

    renderStarship = (x, y, coef = 2) => {
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
}