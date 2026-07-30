import MovingObject from './moving_object';

class Player extends MovingObject {
    constructor(obj) {
        
        super(obj);
        this.dir = 'R';

        this.imgR = new Image();
        this.imgR.src = 'player-right.png';

        this.imgL = new Image();
        this.imgL.src = 'player-left.png';
    }

    // this is an overridden draw method. player will use this draw.
    draw(ctx) {
        // ctx.fillStyle = this.color;
        // ctx.beginPath();
        // ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        // ctx.fill();
        
        if(this.dir === 'R')
            ctx.drawImage(this.imgR, this.pos[0] - 28, this.pos[1] - 40);
        else
            ctx.drawImage(this.imgL, this.pos[0] - 28, this.pos[1] - 40);
    }

    isCollidedWith(otherObj) {
        // otherObj is the rectangle or task
        const arr = otherObj.coords; // make a super class for Rect and Task? ('generalizing')
        const [x1, y1, x2, y2] = [arr[0], arr[1], arr[2], arr[3]];

        const [x, y] = this.currentPos(); 

        return (x > x1 && x < x2) && (y > y1 && y < y2);
    }

    currentPos() {
        return [this.pos[0], this.pos[1]];
    }
    
}

export default Player;