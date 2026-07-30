
class Button {
    constructor(coords) {
        this.coords = coords;
    }

    draw(ctx, color) {
        let [x, y, w, h] = [...this.coords];
        ctx.fillStyle = color || "#111";  // button color
        ctx.fillRect(x, y, w, h);
    }


}

export default Button;