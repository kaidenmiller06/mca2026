import MovingObject from './moving_object';

class Circle extends MovingObject {
    constructor(obj) {
        super(obj);
    }


    // this is an overridden draw method. circles will use this draw.
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
    }

    
    isCollidedWith(otherObj) {
        // otherObj is the rectangle
        const arr = otherObj.coords;
        const [x1, y1, x2, y2] = [arr[0], arr[1], arr[2], arr[3]];

        const [x, y] = [this.pos[0], this.pos[1]]; // change to currentPos()

        return (x > x1 && x < x2) && (y > y1 && y < y2);
    }


}

export default Circle;