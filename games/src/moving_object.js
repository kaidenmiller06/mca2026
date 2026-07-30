class MovingObject {
    constructor(options_obj = {}) {
        this.pos = options_obj.pos || [0,0];
        this.vel = options_obj.vel || [1,1];
        this.radius = options_obj.radius || 5;
        this.color = options_obj.color || "#270aff"; // blue default color
    }

    // default draw method
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0], this.pos[1], 100, 100);
    }

}

export default MovingObject;