
class MovingStars {
    constructor(canv, ctx) {
        this.canv = canv;
        this.ctx = ctx;

        this.scrW = window.innerWidth;


        this.loop();
    }

    loop() {

        const stars = [];

        // initial stars that are there when the page loads
        for(let i = 0; i < 70; i++) {
            stars.push(
                new Star([Math.floor(Math.random() * this.scrW*2), this.randomHeight()], this.randomRadius(), this.randomVelocity())
            );
        }

        // this will make random stars appear from the right side of the screen
        const generateStartsInterval = global.setInterval(() => {
            // generate stars every half a second
            stars.push(new Star([this.scrW + this.randomNum(), this.randomHeight()], this.randomRadius(), this.randomVelocity()));
            stars.push(new Star([this.scrW + this.randomNum(), this.randomHeight()], this.randomRadius(), this.randomVelocity()));
            
        }, 500);

        // this will make random ones pop up in the middle of the screen
        const generateStartsInterval2 = global.setInterval(() => {
            for(let i = 0; i < Math.random() * 3; i++)
                stars.push(new Star([this.randomNum(), this.randomHeight()], this.randomRadius(), this.randomVelocity()));
            
        }, 10000);

        // this will draw and then move each star by its velocity
        const starsInterval = global.setInterval(() => {
            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear the screen

            // for(const s of stars) {
            //     s.draw(this.ctx);
            //     s.pos[0] -= s.velocity;
            // }

            for(let s in stars) {
                stars[s].draw(this.ctx);
                stars[s].pos[0] -= stars[s].velocity;

                if(stars[s].pos[0] <= 0)  // if out of the page
                    stars.splice(s, 1);  // remove from array
            }
            
        }, 24);

        // const garbageCollection = global.setInterval(() => {
        //     // delete stars that are out of the screen
        //      stars.splice(0, 30);
        // }, 10000);

    }

    randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    randomHeight() {
        return Math.floor(Math.random() * window.innerHeight);
    }

    randomRadius() {
        return Math.floor(Math.random() * 4);
    }
    
    randomVelocity() {
        return (Math.random() * 1) + 2.5;
    }
}

class Star {
    constructor(startPos, radius, velocity) {
        this.pos = startPos;
        this.radius = radius;
        this.velocity = velocity;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

export default MovingStars;