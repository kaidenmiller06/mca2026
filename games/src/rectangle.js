
class Rectangle {
    // coords: [startX, startY, endX, endY]
    constructor(coords) { 
        this.coords = coords; // change to individual coords?
    }

    draw(ctx) {
        ctx.fillStyle = "#324479";  // dark cyan ish
        const [startX, startY, endX, endY] = [this.coords[0], this.coords[1], this.coords[2], this.coords[3]];
        const [w, h] = [endX - startX, endY - startY]
        ctx.fillRect(this.coords[0], this.coords[1], w, h);
    }
    
}

export default Rectangle;