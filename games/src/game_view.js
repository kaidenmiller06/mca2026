
class GameView {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;

        this.loop();
        
    }

    draw() {
        // this.game.draw();
    }

    loop() {

        const mainLoop = global.setInterval(() => {
            if(this.game.mousePressed)
                console.log(this.game.curX + " " + this.game.curY);

            // console.log(this.game.taskCompletion);

        }, 100);

    }

    

    // key listeners in here? (moving logic)


    // drawing logic in here?

}

export default GameView;