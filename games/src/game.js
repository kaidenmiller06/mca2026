import TaskSpace from './task_space'
import {SCR_W, SCR_H, MAP_X, MAP_Y, top, left} from './consts.js';

const DIRS = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0]
}

class Game {
    constructor(canv, ctx, origin) {
        this.canv = canv;
        this.ctx = ctx;

        this.origin = origin;

        this.mapImg = new Image();
        this.mapImg.src = 'map.png';
        this.mapX = MAP_X; // -1520; // top left X
        this.mapY = MAP_Y; // -370; // top left Y

        this.env = new Environment();
        this.plyr = new Player({
            pos: [SCR_W/2, SCR_H/2], 
            vel: [30, 30], 
            radius: 12, // am I using radius?
            color: "#0000FF"
        });

        this.tasksComplete = 0;
        this.taskCompletion = [];
        for(let i = 0; i < this.env.taskSpaces.length; i++)
            this.taskCompletion.push(false);  // BUG HERE?
        console.log(this.taskCompletion);
        this.curTask = 0;
        this.taskIntervals = [];

        this.addKeyListener();
        this.addClickListener();
        this.initialDrawMap(ctx);

        this.mousePressed = false;
        [this.curX, this.curY] = [0,0];
    }

    clearTaskIntervals() {
        console.log("clearing TIs");
        for(let taskInterval of this.taskIntervals)
            clearInterval(taskInterval);
    }

    addKeyListener() {
        document.addEventListener('keydown', this.keyListenCode.bind(this));
    }

    // MOVING LOGIC 
    keyListenCode(e) {
        // 'e' is an event object with a 'key' property
        
        let [velX, velY] = this.plyr.vel;
        let offset;
        let mapOffset;

        // so that user can't move while task screen is open
        if(this.curTask && ['w', 'a', 's', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', " "].includes(e.key))
            return;

        /* For movement, shift environment down by offset 
            (circle position stays the same)
            then redraw the current environment.   */
        switch(e.key) {
            case "ArrowUp": 
            case "w":
                offset = [0, DIRS.up[1] * velY];
                break;
            
            case "ArrowDown": 
            case "s":
                offset = [0, DIRS.down[1] * velY];
                break;
        
            case "ArrowLeft": 
            case "a":
                offset = [DIRS.left[0] * velX, 0];
                this.plyr.dir = 'L';
                break;
            
            case "ArrowRight":
            case "d":
                offset = [DIRS.right[0] * velX, 0];
                this.plyr.dir = 'R';
                break;

            case " ":
                let task = this.detectTaskCollisions(this.plyr);
                if(task) {
                    console.log("TASK INITIATED FOR TASK " + task);
                    this.curTask = task;
                }
                break;

            case "Escape":
            case "q":
                this.curTask = 0;
                this.clearTaskIntervals();
                break;

            case "c": 
                // completing task logic
                this.tasksComplete++;
                console.log("Completed task " + this.curTask + "!");
                this.curTask = 0;
                this.clearTaskIntervals();
                break;

            case '0':
                this.mapX = 0;
                this.mapY = 0;
                break;
            
            default: 
                console.log(e.key + " key pressed");
        }

        // if player moved, run this code
        if(offset) {
            this.env.shiftEnvironment(...offset);
            this.mapX -= offset[0];
            this.mapY -= offset[1];

            // if player tried to move into wall
            if(this.detectCollisions(this.plyr)) {
                offset = [-offset[0], -offset[1]];
                mapOffset = [0,0];
                this.env.shiftEnvironment(...offset); // undo the shift
                
                this.mapX -= offset[0];
                this.mapY -= offset[1];
            }

            this.detectTaskCollisions(this.plyr);
        }

        if(this.tasksComplete == this.env.taskSpaces.length)
            console.log("Congratulations!! You completed all the tasks and saved the ship!");

        // REDRAW THE MAP
        this.drawMap(this.ctx);
        
        // console.log(this.taskCompletion);

    }

    addClickListener() {
        // let user close out of task screen,
        // click "use" button, "kill" button
        // open and close "tasks" sidebar
        // open settings (and chat?)
        
        // also logic for completing tasks

        
        document.addEventListener('mousedown', this.clickListenCode.bind(this));
        // this.canv.addEventListener('mousedown', (e) => {
        //     console.log(e.x + " " + e.y + " CLICKED");
        // });

        document.addEventListener('mousemove', (e) => {
            if(this.mousePressed) {
                [this.curX, this.curY] = [(e.x-this.origin[0]), (e.y-this.origin[1])];
                // console.log(this.curX + " " + this.curY);
            }
        });

        document.addEventListener('mouseup', () => {
            this.mousePressed = false;
            console.log("released");
        });
    }

    clickListenCode(e) {
        // console.log("Clicked");
        // console.log(e);
        // 'e' is a 'PointerEvent' object
        //      with a 'x' and 'y' properties
        //      'ctrlKey' and 'shiftKey'
        //      'path' array. if canvas was clicked, 
        //          path[0] === canvas (?)

        let [x, y] = [e.x, e.y];
        // console.log(x + " " + y);

        this.mousePressed = true;
        console.log(`mouse pressed: ${this.mousePressed}`);
        this.curX = x;
        this.curY = y;
        console.log((x-this.origin[0]) + " " + (y-this.origin[1]) + " clicked on canvas");
    }

    detectCollisions() {
         // broken edge case: if circle velocity is too big, it can jump over rectangles

        for(let curRect of this.env.rectangles) {
            if(this.plyr.isCollidedWith(curRect)) {   // if collision
                return true;
            }
        }

        return false;
    }

    detectTaskCollisions() {
        for(let curTS of this.env.taskSpaces) {
            if(this.plyr.isCollidedWith(curTS)) {   // if collision
                // console.log("Collision with task space, task " + curTS.taskNum);
                return curTS.taskNum;
            }
        }
    
        return 0;
    }

    drawMap(ctx) {
        ctx.fillStyle = "#00000000";
        ctx.clearRect(0, 0, SCR_W, SCR_H); // clear the screen

        // REDRAW THE MAP IMAGE
        ctx.drawImage(this.mapImg, this.mapX, this.mapY);

        // REDRAW THE TASK SPACES
        for(let taskSpace of this.env.taskSpaces) taskSpace.draw(ctx);

        // REDRAW THE RECTANGLES
        // for(let rect of this.env.rectangles) rect.draw(ctx);

        // REDRAW THE PLAYER
        this.plyr.draw(ctx);

        // TASK INTERFACE DRAWING LOGIC
        if(this.curTask) {
            this.drawTaskScreen(ctx, this.curTask);
        }

        if(this.taskCompletion[0] && this.taskCompletion[1] && this.taskCompletion[2]) { // hardcoded for now
            ctx.font ='80px sans-serif';
            ctx.fillStyle = 'white';
            ctx.fillText('You saved the ship!!!',16,100);
        }

    }

    drawTaskScreen(ctx, taskNum) {
        let taskScreenWidth = 500; // 506;
        let taskScreenHeight = 400; // 390;

        let topLeft = {
            x: this.canv.width/2 - taskScreenWidth/2,
            y: this.canv.height/2 - taskScreenHeight/2
        };

        ctx.fillStyle = 'gray';
        ctx.fillRect(topLeft.x, topLeft.y, taskScreenWidth, taskScreenHeight);

        ctx.font = '20px serif';
        ctx.fillStyle = 'black';
        ctx.fillText(TaskSpace.taskWords(this.curTask), topLeft.x + 30, topLeft.y + 60);

        // Now draw the individual task
        switch(taskNum) {
            case 1:  // fix navigation
                TaskSpace.drawTask1(ctx, this, topLeft, origin);
                break;

            case 3:  // refill gas
                TaskSpace.drawTask3(ctx, this, topLeft);
                break;

            case 4:  // download files
                TaskSpace.drawTask4(ctx, this, topLeft);
                break;
        }
    }


    // uses top left coordinate, and bottom right coordinates
    isClickingOn( x1, y1, x2, y2) {
        let [x, y] = [this.curX, this.curY];

        return (x >= x1 && x <= x2) && (y >= y1 && y <= y2);
    }

    // uses top left coordinate, and width and height
    isClickingOn2(x1, y1, w, h) {
        let [x, y] = [this.curX , this.curY];
        // console.log(x + " " + y);

        return (x >= x1 && x <= (x1+w)) && (y >= y1 && y <= (y1+h));
    }

    initialDrawMap(ctx) {
        // INITIAL DRAWING LOGIC
        for (const taskSpace of this.env.taskSpaces) taskSpace.draw(ctx);

        // for(const rect of this.env.rectangles) rect.draw(ctx);

        // DRAW THE MAP IMAGE
        this.mapImg.onload = function() {
            ctx.drawImage(this.mapImg, this.mapX, this.mapY);

            // DRAW THE PLAYER
            ctx.drawImage(this.plyr.imgR, this.plyr.pos[0] - 28, this.plyr.pos[1] - 48);
        }.bind(this);   
    }

}

export default Game;