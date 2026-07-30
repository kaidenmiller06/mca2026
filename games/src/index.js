/*  credit to Stark_0010001 for the map image
    https://www.reddit.com/r/AmongUs/comments/jbf24d/i_made_a_completely_clean_skeld_map_some_really/

    credit to Innersloth for all Among Us assets
    https://innersloth.com/gameAmongUs.php
    https://twitter.com/InnerslothDevs
    */
import MovingStars from './moving_stars.js';
window.MovingStars = MovingStars;
   
import GameView from './game_view';
window.GameView = GameView;

import Game from './game';
window.Game = Game;

import Environment from './environment';
window.Environment = Environment;

import MovingObject from './moving_object';
window.MovingObject = MovingObject;

import Player from './player';
window.Player = Player;

import Rectangle from './rectangle';
window.Rectangle = Rectangle;

import TaskSpace from './task_space';
window.TaskSpace = TaskSpace;

import {SCR_W, SCR_H} from './consts.js';

let bgCanvas, canvas;
let bgCtx, ctx;

// INITIAL LOGIC, CODE STARTS HERE
document.addEventListener('DOMContentLoaded', () => {
    
    // let c = document.getElementsByTagName('canvas')[0];
    // let cx = c.getContext("2d");
    // c.width = SCR_W;
    // c.height = SCR_H;
    // cx.fillStyle="blue";
    // cx.fillRect(50, 50, 100, 100);

    // set up scrolling stars background
    
    bgCanvas = document.getElementById("bg-canvas");
    bgCtx = bgCanvas.getContext("2d");
    bgCanvas.width = SCR_W;//window.innerWidth;
    bgCanvas.height = SCR_H;//window.innerHeight;
    new MovingStars(bgCanvas, bgCtx);


    // displacement from the top-left corner of view port
    let rect = bgCanvas.getBoundingClientRect();
    let top = Math.floor(rect.top);
    let left = Math.floor(rect.left);
    // console.log(rect.top, rect.right, rect.bottom, rect.left);  


    // set up canvas and context
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");
    canvas.width = SCR_W;
    canvas.height = SCR_H;

    new Game(canvas, ctx, [left, top]);

});